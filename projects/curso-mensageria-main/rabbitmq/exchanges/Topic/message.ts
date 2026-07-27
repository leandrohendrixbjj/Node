import { randomInt, randomUUID } from "crypto";

export type Message = {
  orderId: string;
  status: string;
  createdAt: string;
};

export function createMessage(): Message {
  return {    
    orderId: randomUUID().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),    
  };
}
