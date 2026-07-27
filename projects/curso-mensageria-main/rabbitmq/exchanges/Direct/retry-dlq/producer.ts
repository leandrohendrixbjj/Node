import { randomUUID } from 'crypto';
import { Timestamp } from '../../../../in-memory/domain/timestamp.ts';
import { criarBroker } from '../../../client.factory.ts';
import { createMessage } from './message.ts';

async function produce(order: number) {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);

  const exchange = 'pedido.events.exchange';
  const routingKey = 'pedido.criado';

  const message = createMessage(order);

  const canal = await client.createConfirmChannel();

  // Garante que a exchange exista
  await canal.assertExchange(exchange, 'direct', {
    durable: true,
  });

  const published = canal.publish(
    exchange,
    routingKey,
    Buffer.from(JSON.stringify(message)),
    {
      // AMQP Properties
      persistent: true,
      contentType: 'application/json',
      correlationId: message.messageId,
      messageId: randomUUID(),
      priority: 0,

      // Headers da aplicação
      headers: {
        producer: 'producer.supply',
        version: '1.0.0',
        traceId: randomUUID(),
        timestamp: Timestamp.now('America/Sao_Paulo'),
        'x-retry-count': 0,
      },
    }
  );

  if (!published) {
    console.warn('⚠️ Buffer interno do canal cheio. Aguardando drain...');
    await new Promise<void>((resolve) => canal.once('drain', resolve));
  }

  await canal.waitForConfirms();

  console.log('✅ Mensagem publicada com sucesso');
  console.log(`Exchange : ${exchange}`);
  console.log(`RoutingKey: ${routingKey}`);
  console.log(message);

  await canal.close();
  await client.close();
}

// Ordem dinâmica via argumento:
// npm run producer -- 10
const orderFromArgs = Number(process.argv.at(2) ?? 1);

if (Number.isNaN(orderFromArgs)) {
  console.error('❌ Ordem inválida. Use um número, ex: npm run producer -- 30');
  process.exit(1);
}

await produce(orderFromArgs);