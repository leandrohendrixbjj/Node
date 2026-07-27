import { randomInt, randomUUID } from "crypto";

export type Message = {
  order: number;
  title: string;
  messageId: string;
};

export function createMessage(order: number): Message {
  return {    
    order: randomInt(1, 100),
    title: 'Pedido de supply',
    messageId: randomUUID().toString(),
  };
}
