/**
 * Prefetch — limita quantas mensagens o Rabbit envia por vez.
 * Ex.: `prefetch(1)` → só entrega a próxima depois do `ack` da atual.
 */

import chalk from 'chalk';
import { criarBroker } from '../../client.factory.ts';
import { topicConfig } from './config.ts';
import type { Message } from './message.ts';

export async function consume() {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);
  const { exchange, queues, bindingKey, prefetch } = topicConfig;

  const canal = await client.createChannel();
  await canal.prefetch(prefetch);

  // Garante a mesma topologia do producer (exchange + filas + binding order.*)
  await canal.assertExchange(exchange.name, exchange.type, exchange.options);

  for (const queue of queues) {
    await canal.assertQueue(queue.name, queue.options);
    await canal.bindQueue(queue.name, exchange.name, bindingKey);
  }

  console.debug(
    chalk.blue('🚀 Aguardando mensagens | exchange=%s | binding=%s | filas=%s'),
    exchange.name,
    bindingKey,
    queues.map((q) => q.name).join(', '),
  );

  for (const queue of queues) {
    canal.consume(
      queue.name,
      (msg) => {
        if (msg === null) {
          console.debug(
            chalk.yellow('Consumer cancelado pelo servidor | queue=%s'),
            queue.name,
          );
          return;
        }

        const message = JSON.parse(msg.content.toString()) as Message;
        const routingKey = msg.fields.routingKey;

        console.debug(
          chalk.green('✅ Mensagem recebida | queue=%s | rk=%s | %o'),
          queue.name,
          routingKey,
          message,
        );

        canal.ack(msg);
      },
      { noAck: false },
    );
  }
}

await consume();
