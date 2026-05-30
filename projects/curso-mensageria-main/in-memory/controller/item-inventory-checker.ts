import { channels } from '../router/channels.ts';
import { createMessage, type Message } from '../domain/message.ts';
import type { ItemPedido } from '../domain/pedido.interface.ts';

export function router(msg: Message) {
  const itemPedido: ItemPedido = JSON.parse(msg.payload);
  
  const tipoItem = itemPedido.id.startsWith('C')
      ? 'computador'
      : 'smartphone';
  
  const jobChecarInventario = createMessage({
      id: undefined,
      header: msg.header,
      payload: itemPedido      
  });
  
  if(tipoItem === 'computador') {
    channels.inventarioComputador.sendToChanel(jobChecarInventario);
  } else {
    channels.inventarioSmartphone.sendToChanel(jobChecarInventario);
  }
}

export function initItemInventoryChecker() {
  channels.itemPedido.subscribe(router);
}