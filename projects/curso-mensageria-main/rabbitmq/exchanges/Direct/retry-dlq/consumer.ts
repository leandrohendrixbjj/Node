/**
 * Prefetch — limita quantas mensagens o Rabbit envia por vez.
 * Ex.: `prefetch(1)` → só entrega a próxima depois do `ack` da atual.
 * 
 * Criamos uma Exchange do tipo Direct
 *    - e.mensageria
 *    - Routing Key: direct.key
 * 
  
 * Criamos uma Queue: q.direct
 *    -  Bindings: e.mensageria -> direct.key
 * 
 * Criamos uma Queue: q.direct.retry
 *    - x-message-ttl = 60000 => Tempo de vida da mensagem na fila de retry
 *    - x-dead-letter-exchange = e.mensageria => Exchange de destino da mensagem
 *    - x-dead-letter-routing-key = direct.key => Routing Key de destino da mensagem
 * 
 * Criamos uma Queue: q.direct.dlq
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
import { directConfig } from '../config.ts';

export async function consume() {
  const client = await criarBroker(process.env.CONNECTION_STRING as string);
  const { queue, retryQueue, dlqQueue, maxRetries, LIGAR_TESTE_RETRY_DLQ } = directConfig;
  
  // Recebe os nomes das filas
  const fila = queue.name;
  const filaRetry = retryQueue.name;
  const filaDlq = dlqQueue.name;

  const canal = await client.createChannel();
  await canal.prefetch(1);

  // Cria a fila de retry
  await canal.assertQueue(retryQueue.name, retryQueue.options);

  // Cria a fila de DLQ
  await canal.assertQueue(dlqQueue.name, dlqQueue.options);

  console.debug(chalk.blue('🚀 Aguardando mensagens na fila: %s'), fila);

  canal.consume(
    fila,
    async (msg) => {
      if (msg === null) {
        console.debug(chalk.yellow('Consumer cancelado pelo servidor'));
        return;
      }

      const message = JSON.parse(msg.content.toString());
      const headers = msg.properties.headers || {};
      const retryCount = (headers['x-retry-count'] as number) || 0;

      try {
        console.debug(chalk.green('✅ Mensagem recebida (Tentativa %d de %d): %o'), retryCount + 1, maxRetries + 1, message);
        
        // Simulação de processamento (jogue um erro aqui para testar o retry)
        if (LIGAR_TESTE_RETRY_DLQ) {
          throw new Error('Falha no processamento do pedido de supply');
        } else {
          // Acknowledge: confirma que a mensagem foi processada com sucesso.
          canal.ack(msg, true);
          console.debug(chalk.green('✅ Mensagem processada com sucesso'));
        }
      } catch (error: any) {
        console.error(chalk.red('❌ Teste de error no processamento da mensagem: %s'), error.message);

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