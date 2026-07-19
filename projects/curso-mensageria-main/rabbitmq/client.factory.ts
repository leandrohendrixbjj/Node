/**
 * Graceful shutdown em SIGINT / SIGTERM:
 * - SIGINT  → Ctrl+C no terminal
 * - SIGTERM → Docker, Kubernetes, systemd, `kill`, etc.
 *
 * Antes de o processo morrer, fechamos a conexão com o RabbitMQ
 * (e, no restante da app: DB, Redis, HTTP, operações pendentes).
 * Assim o broker libera imediatamente os recursos da conexão.
 */
import amqp from 'amqplib';
import type { ChannelModel } from 'amqplib';

const SHUTDOWN_SIGNALS = ['SIGINT', 'SIGTERM'] as const;

export async function criarBroker(
  connectionString: string,
): Promise<ChannelModel> {
  const channelModel = await amqp.connect(connectionString);

  for (const signal of SHUTDOWN_SIGNALS) {
    process.on(signal, async () => {
      await channelModel.close();
    });
  }

  return channelModel;
}
