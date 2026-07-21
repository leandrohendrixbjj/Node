import { randomUUID } from 'crypto';
import { Timestamp } from '../../../in-memory/domain/timestamp.ts';
import { criarBroker } from '../../client.factory.ts';
import { createMessage } from './message.ts';

async function produce() {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);
 
  // Alterado para o nome correto da Exchange do tipo fanout
  const exchangeName = 'tickets.fanout';
  const message = createMessage();

  const canal = await client.createConfirmChannel();
  
  // Garantimos que a exchange existe (opcional se já foi criada pela UI, mas boa prática)
  await canal.assertExchange(exchangeName, 'fanout', { durable: true });

  // O publish envia para a EXCHANGE, e não mais para uma fila diretamente.
  // O segundo argumento é a routing key (''), que a exchange fanout ignora.
  canal.publish(exchangeName, '', Buffer.from(JSON.stringify(message)), {
    // Properties (AMQP)
    persistent: true,
    contentType: 'application/json',    
    correlationId: message.ticketId,
    expiration: '60000',
    priority: 0,

    // Headers (AMQP)
    headers: {
      eventName: 'ticket.created',
      producer: 'tickets-fanout-producer',
      version: '1.0.0',
      replyTo: '1',
      traceId: randomUUID().toString(),
      timestamp: Timestamp.now('America/Sao_Paulo'),
    },
  });

  await canal.waitForConfirms();
  console.log('✅ Mensagem confirmada pelo broker na exchange fanout: %o', message);

  await canal.close();
  process.exit(0);
}

const emailFromArgs = Number(process.argv.at(2) ?? 1);

if (Number.isNaN(emailFromArgs)) {
  console.error('❌ Email inválido. Use um número, ex: npm run producer -- 30');
  process.exit(1);
}

await produce();