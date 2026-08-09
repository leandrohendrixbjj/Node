/**
 * Prefetch — limita quantas mensagens o Rabbit envia por vez.
 * Ex.: `prefetch(1)` → só entrega a próxima depois do `ack` da atual.
 */

import chalk from 'chalk';
import { criarBroker } from '../../client.factory.ts';
import { directConfig } from './config.ts';

export async function consume() {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);
  const { exchange, queue, routingKey } = directConfig;

  const canal = await client.createChannel();
  await canal.prefetch(1);

  console.debug(
    chalk.blue('🚀 Aguardando mensagens | exchange=%s | queue=%s | rk=%s'),
    exchange.name,
    queue.name,
    routingKey,
  );

  canal.consume(
    queue.name,
    async (msg) => {
      if (msg === null) {
        console.debug(chalk.yellow('Consumer cancelado pelo servidor'));
        return;
      }

      const message = JSON.parse(msg.content.toString());

      try {
        console.debug(chalk.green('✅ Mensagem recebida: %o'), message);
        canal.ack(msg);
      } catch (error: any) {
        console.error(chalk.red('❌ Erro ao processar mensagem: %s'), error.message);
        canal.nack(msg, false, true);
      }
    },
    { noAck: false },
  );
}

await consume();
