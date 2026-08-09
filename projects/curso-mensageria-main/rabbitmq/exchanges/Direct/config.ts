const EXCHANGE_NAME = 'e.mensageria';
const ROUTING_KEY = 'direct.key';

export const directConfig = {
  exchange: {
    name: EXCHANGE_NAME,
    type: 'direct' as const,
    options: {
      durable: false,
      autoDelete: false,
    },
  },
  queue: {
    name: 'q.direct',
    options: {
      durable: false,
      autoDelete: false,
      arguments: {
        'x-message-ttl': 5 * 60 * 1000, // 5 minutos
      },
    },
  },
  retryQueue: {
    name: 'q.direct.retry',
    options: {
      durable: false,
      autoDelete: false,
      arguments: {
        'x-message-ttl': 20_000, // 20s na fila de retry
        'x-dead-letter-exchange': EXCHANGE_NAME,
        'x-dead-letter-routing-key': ROUTING_KEY,
      },
    },
  },
  dlqQueue: {
    name: 'q.direct.dlq',
    options: {
      durable: false,
      autoDelete: false,
    },
  },
  routingKey: ROUTING_KEY,
  maxRetries: 3,
  LIGAR_TESTE_RETRY_DLQ: true,
} as const;
