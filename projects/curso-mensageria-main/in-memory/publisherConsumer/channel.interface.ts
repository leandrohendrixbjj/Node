import { type Message } from '../domain/message.ts';
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
       console.log(`Publisher: ${name}:`, message);
       eventEmitter.emit(name, message);
    },
    
    // Consumer
    subscribe(handler: (message: Message) => void) {
      eventEmitter.on(name, (message: Message) => {
        //console.debug(`Consumer: [${name}]:`, message);
        handler(message);
      });
    },
  };
}
