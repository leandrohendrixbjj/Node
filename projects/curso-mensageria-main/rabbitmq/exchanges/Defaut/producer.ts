import { randomUUID } from 'crypto';
import { Timestamp } from '../../../in-memory/domain/timestamp.ts';
import { criarBroker } from '../../client.factory.ts';
import { createMessage } from './message.ts';

async function produce(order: number) {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);
  const fila = 'q.default';
  const message = createMessage(order);

  const canal = await client.createConfirmChannel();
  await canal.assertQueue(fila);

  canal.sendToQueue(fila, Buffer.from(JSON.stringify(message)), {
    // Properties (AMQP)
    persistent: true,
    contentType: 'application/json',    
    correlationId: message.messageId,
    expiration: '60000',
    priority: 0,

    // Headers (AMQP)
    headers: {
      eventName: 'order.created',
      producer: 'my-first-producer',
      version: '1.0.0',
      replyTo: '1',
      traceId: randomUUID().toString(),
      timestamp: Timestamp.now('America/Sao_Paulo'),
    },
  });

  await canal.waitForConfirms();
  console.log('✅ Mensagem confirmada pelo broker: %o', message);

  await canal.close();
  process.exit(0);
}

// Ordem dinâmica via argumento: npm run producer -- 10
const orderFromArgs = Number(process.argv.at(2) ?? 1);

if (Number.isNaN(orderFromArgs)) {
  console.error('❌ Ordem inválida. Use um número, ex: npm run producer -- 30');
  process.exit(1);
}

await produce(orderFromArgs);
