import { type Message } from './message.ts';
import EventEmitter from 'node:events';


export interface Channel {
  name: string;
  sendToChanel(message: Message): Promise<void>;
  subscribe(handler: (message: Message) => void): void;
}

export function createChannel(name: string): Channel {
  const eventEmitter = new EventEmitter();
  
  return {
    name,    
    
    // Publisher
    async sendToChanel(message: Message) {
      const exceptionChannelName = ['item_pedido'];

      if (!exceptionChannelName.includes(name)){
        console.log(`Enviando mensagem para o canal ${name}:`, message);
      }

      eventEmitter.emit(name, message);
    },
    
    // Consumer
    subscribe(handler: (message: Message) => void) {
      eventEmitter.on(name, handler);
    },
  };
}
