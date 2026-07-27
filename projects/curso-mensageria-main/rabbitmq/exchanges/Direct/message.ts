import { randomInt, randomUUID } from "crypto";

export type Message = {
  destination: string;
  title: string;
  messageId: string;
};

export function createMessage(order: number): Message {
  return {        
    destination: 'ana@gmail.com',
    title: 'Email de ticket',
    messageId: randomUUID().toString(),
  };
}
