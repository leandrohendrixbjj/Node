import chalk from 'chalk';
import { criarBroker } from './client.factory.ts';
import type { Message } from './message.ts';

export async function consume() {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);
  const fila = 'tasks';

  const canal = await client.createChannel();
  await canal.assertQueue(fila);

  console.debug(chalk.blue('🚀 Aguardando mensagens na fila: %s'), fila);

  canal.consume(
    fila,
    (msg) => {
      if (msg === null) {
        console.debug(chalk.yellow('Consumer cancelado pelo servidor'));
      } else {
        const message = JSON.parse(msg.content.toString()) as Message;
        console.debug(chalk.green('✅ Mensagem recebida: %o'), message);
      }
    },
    {
      noAck: true,
    },
  );
}

await consume();