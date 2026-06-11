import { channels } from '../router/channels.ts';
import { createMessage, type Message } from '../domain/message.ts';
import type { ItemPedido } from '../domain/pedido.interface.ts';

export function router(msg: Message) {
  const itemPedido: ItemPedido = JSON.parse(msg.payload);
  let tipoItem = 'invalido';
  
  if(itemPedido.id.startsWith('C')) {
    tipoItem = 'computador';
  } else if(itemPedido.id.startsWith('S')) {
    tipoItem = 'smartphone';
  } 

  const jobChecarInventario = createMessage({
      id: undefined,
      header: msg.header,
      payload: itemPedido      
  });
  
  if(tipoItem === 'computador') {
    channels.inventarioComputador.sendToChanel(jobChecarInventario);
  } else if(tipoItem === 'smartphone') {
    channels.inventarioSmartphone.sendToChanel(jobChecarInventario);
  } else {
    channels.itemInvalido.sendToChanel(jobChecarInventario);
  }
}

channels.itemPedido.subscribe(router);
