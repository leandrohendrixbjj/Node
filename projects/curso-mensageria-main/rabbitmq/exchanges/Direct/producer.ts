import { randomInt, randomUUID } from 'crypto';
import { Timestamp } from '../../../in-memory/domain/timestamp.ts';
import { criarBroker } from '../../client.factory.ts';
import { directConfig } from './config.ts';

async function produce(event: string) {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);

  const message = {
    messageId: randomUUID(),
    orderId: randomInt(0, 201), // 0..200
    timestamp: Timestamp.now('America/Sao_Paulo'),
  };

  const canal = await client.createConfirmChannel();
  const { exchange, queue, routingKey } = directConfig;

  await canal.assertExchange(exchange.name, exchange.type, exchange.options);
  await canal.assertQueue(queue.name, queue.options);
  await canal.bindQueue(queue.name, exchange.name, routingKey);

  const published = canal.publish(
    exchange.name,
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
        producer: 'producer.tickets',
        event: event,
        version: '1.0.0',
        traceId: randomUUID(),
        timestamp: Timestamp.now('America/Sao_Paulo'),
        'x-retry-count': 0,
      },
    },
  );

  if (!published) {
    console.warn('⚠️ Buffer interno do canal cheio. Aguardando drain...');
    await new Promise<void>((resolve) => canal.once('drain', resolve));
  }

  await canal.waitForConfirms();

  console.log('✅ Mensagem publicada com sucesso');
  console.log(`Exchange : ${exchange.name}`);
  console.log(`RoutingKey: ${routingKey}`);
  console.log(message);

  await canal.close();
  await client.close();
}

const orderFromArgs = Number(process.argv.at(2) ?? 1);

if (Number.isNaN(orderFromArgs)) {
  console.error('❌ Ordem inválida. Use um número, ex: npm run producer -- 30');
  process.exit(1);
}

await produce('Queue.model.type.direct');
