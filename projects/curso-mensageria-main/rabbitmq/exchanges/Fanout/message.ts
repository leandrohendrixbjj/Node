import { randomInt, randomUUID } from "crypto";

export type Message = {
  ticketId: string;
  status: string;
  createdAt: string;
};

export function createMessage(): Message {
  return {    
    ticketId: randomUUID().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),    
  };
}
