/**
 * Prefetch — limita quantas mensagens o Rabbit envia por vez.
 * Ex.: `prefetch(1)` → só entrega a próxima depois do `ack` da atual.
 * 
 * Criamos uma Exchange do tipo Direct
 *    - Pedido.events.exchange
 *    - Routing Key: pedido.criado
 * 
 * Criamos uma Exchange do tipo Direct
 *    - pedido.events.retry.exchange
 *    - Routing Key: ND
 * 
 * Criamos uma Queue: q.pedido.supply
 *    -  Bindings: pedido.events.exchange -> pedido.criado
 * 
 * Criamos uma Queue: q.pedido.supply.retry
 *    - x-message-ttl = 60000 => Tempo de vida da mensagem na fila de retry
 *    - x-dead-letter-exchange = pedido.events.exchange => Exchange de destino da mensagem
 *    - x-dead-letter-routing-key = pedido.criado => Routing Key de destino da mensagem
 * 
 * Criamos uma Queue: q.pedido.supply.dlq
 *    - Bindings: Não possui bindings
 *    - Obs: quem deve publicar dados nessa queue é consumer com base em x-retry-count. Que deve ficar como atributo
 *      dentro do header da mensagem.
 *
 * Fluxo:
 *
 *   Producer
 *      │
 *      ▼
 *   pedido.events.exchange
 *      │
 *      ▼
 *   q.pedido.supply
 *      │
 *      ├── sucesso ──► ACK
 *      │
 *      └── erro
 *             │
 *             ▼
 *   q.pedido.supply.retry  (TTL = 60s)
 *             │
 *             ▼
 *   pedido.events.exchange
 *             │
 *             ▼
 *   q.pedido.supply
 *             │
 *             ├── retry 1
 *             ├── retry 2
 *             ├── retry 3
 *             │
 *             └── erro novamente
 *                        │
 *                        ▼
 *             q.pedido.supply.dlq
 */

import chalk from 'chalk';
import { criarBroker } from '../../../client.factory.ts';
import type { Message } from './message.ts';

export async function consume() {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);
  const fila = 'q.pedido.supply';
  const filaRetry = 'q.pedido.supply.retry';
  const filaDlq = 'q.pedido.supply.dlq';
  const maxRetries = 3;

  const canal = await client.createChannel();
  await canal.prefetch(1);

  console.debug(chalk.blue('🚀 Aguardando mensagens na fila: %s'), fila);

  canal.consume(
    fila,
    async (msg) => {
      if (msg === null) {
        console.debug(chalk.yellow('Consumer cancelado pelo servidor'));
        return;
      }

      const message = JSON.parse(msg.content.toString()) as Message;
      const headers = msg.properties.headers || {};
      const retryCount = (headers['x-retry-count'] as number) || 0;

      try {
        console.debug(chalk.green('✅ Mensagem recebida (Tentativa %d de %d): %o'), retryCount + 1, maxRetries + 1, message);
        
        // Simulação de processamento (jogue um erro aqui para testar o retry)
        //throw new Error('Falha no processamento do pedido de supply');

        // Acknowledge: confirma que a mensagem foi processada com sucesso.
        canal.ack(msg);
      } catch (error: any) {
        console.error(chalk.red('❌ Erro ao processar mensagem: %s'), error.message);

        if (retryCount >= maxRetries) {
          console.error(chalk.bgRed.white(' 🚨 Número máximo de retries (%d) atingido. Descartando mensagem (ou enviando para DLQ). '), maxRetries);
          
          // Como atingiu o limite, damos ack para retirá-la da fila principal 
          // (se preferir salvar, você poderia enviá-la para uma DLQ final antes do ack)
          canal.sendToQueue(filaDlq, msg.content, {
            ...msg.properties,
            headers: {
              ...headers,
              'x-retry-count': retryCount,
            },
          });
          canal.ack(msg);
        } else {
          const nextRetryCount = retryCount + 1;
          console.warn(chalk.yellow('⚠️ Enviando para a fila de retry (Próxima tentativa será a %d)...'), nextRetryCount + 1);

          // Publica diretamente na fila de retry com o header atualizado
          canal.sendToQueue(filaRetry, msg.content, {
            ...msg.properties,
            headers: {
              ...headers,
              'x-retry-count': nextRetryCount,
            },
          });

          // Confirma a mensagem atual na fila principal para tirá-la de lá
          canal.ack(msg);
        }
      }
    },
    {
      noAck: false,
    },
  );
}

await consume();