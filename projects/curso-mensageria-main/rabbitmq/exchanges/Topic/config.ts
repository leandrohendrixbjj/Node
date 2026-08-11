const EXCHANGE_NAME = 'e.orders.topic';
const BINDING_KEY = 'order.*';

export const topicConfig = {
  exchange: {
    name: EXCHANGE_NAME,
    type: 'topic' as const,
    options: {
      durable: true,
      autoDelete: false      
    },
  },
  queues: [
    {
      name: 'q.ticket.created',
      options: {
        durable: true,
        autoDelete: false,
        arguments: {
          'x-message-ttl': 5 * 60 * 1000, // 5 minutos
        },
      },
    },
    {
      name: 'q.ticket.deleted',
      options: {
        durable: true,
        autoDelete: false,
        arguments: {
          'x-message-ttl': 5 * 60 * 1000, // 5 minutos
        },
      },
    },
    {
      name: 'q.ticket.created.email',
      options: {
        durable: true,
        autoDelete: false,
        arguments: {
          'x-message-ttl': 5 * 60 * 1000, // 5 minutos
        },
      },
    },
  ],
  // Binding com curinga *: qualquer routing key order.<um-segmento> cai nas duas filas
  bindingKey: BINDING_KEY,
  // Routing keys de exemplo usadas no publish (precisam casar com order.*)
  routingKeys: {
    created: 'order.*',    
  },
  prefetch: 1,
} as const;
