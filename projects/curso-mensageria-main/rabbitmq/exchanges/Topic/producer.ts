import { randomUUID } from 'crypto';
import { Timestamp } from '../../../in-memory/domain/timestamp.ts';
import { criarBroker } from '../../client.factory.ts';
import { createMessage } from './message.ts';

async function produce() {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);
 
  // 1. Ajustado para o nome correto da Exchange do tipo topic
  const exchangeName = 'orders.topic';
  const message = createMessage();

  const canal = await client.createConfirmChannel();
  
  // 2. Garantimos que a exchange existe como 'topic'
  await canal.assertExchange(exchangeName, 'topic', { durable: true });

  // 3. Com essa routing key vamos criar msg nas filas: q.orders.sales e q.orders
    const routingKey = 'orders.sales.created';

  canal.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)), {
    // Properties (AMQP)
    persistent: true,
    contentType: 'application/json',    
    correlationId: message.orderId, // ou message.orderId dependendo do seu domínio
    expiration: '60000',
    priority: 0,

    // Headers (AMQP)
    headers: {
      eventName: 'order.created',
      producer: 'orders-topic-producer',
      version: '1.0.0',
      replyTo: '1',
      traceId: randomUUID().toString(),
      timestamp: Timestamp.now('America/Sao_Paulo'),
    },
  });

  await canal.waitForConfirms();
  console.log(`✅ Mensagem confirmada pelo broker na exchange topic [${exchangeName}] com routing key [${routingKey}]: %o`, message);

  await canal.close();
  process.exit(0);
}

const emailFromArgs = Number(process.argv.at(2) ?? 1);

if (Number.isNaN(emailFromArgs)) {
  console.error('❌ Argumento inválido. Use um número, ex: npm run producer -- 30');
  process.exit(1);
}

await produce();