import { type Message } from "../domain/message.ts";
import { type Pedido } from "../domain/pedido.interface.ts";
import { channels } from "../router/channels.ts";
import chalk from 'chalk';

const SISTEMA = '[ANALISE]';

const messageStorage = new Map<string, Pedido>();

export function analise(msg: Message) {
    const pedido: Pedido = JSON.parse(msg.payload);
    
    if (messageStorage.has(pedido.id)) {
      console.warn(
        chalk.yellow.bold(
          `${SISTEMA} - Mensagem de pedido duplicada recebida:`, pedido.id
        )
      );
      return;
    }  
    
    messageStorage.set(pedido.id, pedido);
    console.debug(`${SISTEMA} - Analisando Pedido:`, pedido.id);
    
}

channels.pedido.subscribe(analise);



