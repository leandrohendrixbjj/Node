import { randomInt, randomUUID } from "crypto";

export type Message = {
  destination: string;
  title: string;
  emailMessageId: string;
};

export function createMessage(destination: string): Message {
  return {    
    destination: destination,
    title: 'Envio de email de pedido de venda',
    emailMessageId: randomUUID().toString(),
  };
}
