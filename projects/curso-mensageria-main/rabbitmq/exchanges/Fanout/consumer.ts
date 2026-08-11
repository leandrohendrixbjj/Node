/**
 * Prefetch — limita quantas mensagens o Rabbit envia por vez.
 * Ex.: `prefetch(1)` → só entrega a próxima depois do `ack` da atual.
 */

import chalk from 'chalk';
import { criarBroker } from '../../client.factory.ts';
import { fanoutConfig } from './config.ts';

export async function consume() {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);
  const { exchange, queues, routingKey } = fanoutConfig;

  const canal = await client.createChannel();
  await canal.prefetch(fanoutConfig.prefetch);

  console.debug(
    chalk.blue('🚀 Aguardando mensagens | exchange=%s | filas=%s | rk=%s'),
    exchange.name,
    queues.map((q) => q.name).join(', '),
    routingKey || '(vazia)',
  );

  for (const queue of queues) {
    canal.consume(
      queue.name,
      async (msg) => {
        if (msg === null) {
          console.debug(chalk.yellow('Consumer cancelado pelo servidor | queue=%s'), queue.name);
          return;
        }

        const message = JSON.parse(msg.content.toString());

        try {
          console.debug(
            chalk.green('✅ Mensagem recebida | queue=%s | %o'),
            queue.name,
            message,
          );
          canal.ack(msg);
        } catch (error: any) {
          console.error(chalk.red('❌ Erro ao processar mensagem: %s'), error.message);
          canal.nack(msg, false, true);
        }
      },
      { noAck: false },
    );
  }
  
}

await consume();

