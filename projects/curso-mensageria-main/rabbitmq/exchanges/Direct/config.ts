export const directConfig = {
  exchange: {
    name: 'e.mensageria',
    type: 'direct' as const,
    options: {
      durable: false,
      autoDelete: true,
    },
  },
  queue: {
    name: 'q.direct',
    options: {
      durable: false,
      autoDelete: true,
      arguments: {
        'x-message-ttl': 2 * 60 * 1000, // 2 minutos
      },
    },
  },
  routingKey: 'direct.key',
} as const;
