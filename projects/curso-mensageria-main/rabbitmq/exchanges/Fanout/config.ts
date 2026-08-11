const EXCHANGE_NAME = 'e.mensageria.fanout';

export const fanoutConfig = {
  exchange: {
    name: EXCHANGE_NAME,
    type: 'fanout' as const,
    options: {
      durable: false,
      autoDelete: false,
    },
  },
  queues: [
    {
      name: 'q.fanout1',
      options: {
        durable: false,
        autoDelete: false,
        arguments: {
          'x-message-ttl': 5 * 60 * 1000, // 5 minutos
        },
      },
    },
    {
      name: 'q.fanout2',
      options: {
        durable: false,
        autoDelete: false,
        arguments: {
          'x-message-ttl': 5 * 60 * 1000, // 5 minutos
        },
      },
    },
  ],
  // Fanout ignora a routing key; usamos string vazia no bind/publish
  routingKey: '',
  prefetch: 1,
} as const;

