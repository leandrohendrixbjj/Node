/**
 * Prefetch — limita quantas mensagens o Rabbit envia por vez.
 * Ex.: `prefetch(1)` → só entrega a próxima depois do `ack` da atual.
 *
 * Direct exchange:
 *   Exchange   : e.tickets
 *   Queue      : q.ticket.emails
 *   RoutingKey : ticket.emails
 *
 *   Producer → e.tickets (ticket.emails) → q.ticket.emails → Consumer
 */

import chalk from 'chalk';
import { criarBroker } from '../../client.factory.ts';
import type { Message } from './message.ts';

export async function consume() {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);

  const exchange = 'e.tickets';
  const fila = 'q.ticket.emails';
  const routingKey = 'ticket.emails';

  const canal = await client.createChannel();
  await canal.prefetch(1);

  console.debug(
    chalk.blue('🚀 Aguardando mensagens | exchange=%s | queue=%s | rk=%s'),
    exchange,
    fila,
    routingKey,
  );

  // Consome da fila (não da exchange/routing key).
  // A fila q.ticket.emails deve estar bound em e.tickets com routing key ticket.emails.
  canal.consume(
    fila,
    async (msg) => {
      if (msg === null) {
        console.debug(chalk.yellow('Consumer cancelado pelo servidor'));
        return;
      }

      const message = JSON.parse(msg.content.toString()) as Message;

      try {
        console.debug(chalk.green('✅ Mensagem recebida: %o'), message);
        canal.ack(msg);
      } catch (error: any) {
        console.error(chalk.red('❌ Erro ao processar mensagem: %s'), error.message);
        // requeue=true → devolve a mensagem para a fila
        canal.nack(msg, false, true);
      }
    },
    // noAck: false → mensagens Unacknowledged são reenviadas se o consumidor cair
    { noAck: false },
  );
}

await consume();
