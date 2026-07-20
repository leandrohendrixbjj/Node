/**
 * Prefetch — limita quantas mensagens o Rabbit envia por vez.
 *
 * Ex.: `prefetch(1)` → só entrega a próxima depois do `ack` da atual.
 */

import chalk from 'chalk';
import { criarBroker } from '../../client.factory.ts';
import type { Message } from './message.ts';

export async function consume() {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);
  const fila = 'q.send-emails';

  const canal = await client.createChannel();
  await canal.assertQueue(fila);
  await canal.prefetch(1);

  console.debug(chalk.blue('🚀 Aguardando mensagens na fila: %s'), fila);

  canal.consume(
    fila,
    (msg) => {
      if (msg === null) {
        console.debug(chalk.yellow('Consumer cancelado pelo servidor'));
      } else {
        const message = JSON.parse(msg.content.toString()) as Message;
        console.debug(chalk.green('✅ Mensagem recebida: %o'), message);
        
        // Acknowledge: confirma que a mensagem foi processada com sucesso. ( Respeita o Prefetch   )
        canal.ack(msg);
      }
    },
    {
      // noAck: Garante que mensagens com estado de Unacknowledged (não confirmadas) serão reenviadas caso o consumidor falhar.
      // Sem esse parâmetro existe um risco de perder mensagens que estão em um estado de Unacknowledged se o consumidor falhar.
      noAck: false,
    },
  );
}

await consume();