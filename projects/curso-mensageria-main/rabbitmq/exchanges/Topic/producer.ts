import { randomUUID } from 'crypto';
import { Timestamp } from '../../../in-memory/domain/timestamp.ts';
import { criarBroker } from '../../client.factory.ts';
import { topicConfig } from './config.ts';
import { createMessage } from './message.ts';

async function produce(routingKey: string) {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);
  const message = createMessage();
  const canal = await client.createConfirmChannel();

  const { exchange, queues, bindingKey } = topicConfig;

  // Exchange topic em tempo de execução
  await canal.assertExchange(exchange.name, exchange.type, exchange.options);

  // Filas + binding order.* em tempo de execução
  for (const queue of queues) {
    await canal.assertQueue(queue.name, queue.options);
    await canal.bindQueue(queue.name, exchange.name, bindingKey);
  }

  const published = canal.publish(
    exchange.name,
    routingKey,
    Buffer.from(JSON.stringify(message)),
    {
      persistent: true,
      contentType: 'application/json',
      correlationId: message.orderId,
      expiration: '60000',
      priority: 0,
      headers: {
        eventName: routingKey,
        producer: 'orders-topic-producer',
        version: '1.0.0',
        replyTo: '1',
        traceId: randomUUID().toString(),
        timestamp: Timestamp.now('America/Sao_Paulo'),
      },
    },
  );

  if (!published) {
    console.warn('⚠️ Buffer interno do canal cheio. Aguardando drain...');
    await new Promise<void>((resolve) => canal.once('drain', resolve));
  }

  await canal.waitForConfirms();

  console.log('✅ Mensagem confirmada pelo broker');
  console.log(`Exchange    : ${exchange.name}`);
  console.log(`Binding     : ${bindingKey}`);
  console.log(`RoutingKey  : ${routingKey}`);
  console.log(`Filas       : ${queues.map((q) => q.name).join(', ')}`);
  console.log(message);

  await canal.close();
  await client.close();
  process.exit(0);
}

// Uso: npm run producer -- created | deleted
// Ambas as routing keys casam com order.* → mensagem chega nas duas filas
const eventFromArgs = process.argv.at(2) ?? 'created';
const routingKey =
  topicConfig.routingKeys[eventFromArgs as keyof typeof topicConfig.routingKeys];

if (!routingKey) {
  console.error(
    '❌ Argumento inválido. Use: created | deleted (ex: npm run producer -- created)',
  );
  process.exit(1);
}

await produce(routingKey);
