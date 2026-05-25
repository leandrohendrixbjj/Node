import { channels } from './channels.ts';
import { createMessage, type Message } from './message.ts';
import type { ItemPedido } from './pedido.interface.ts';

export function router(msg: Message) {
  const itemPedido: ItemPedido = JSON.parse(msg.payload);
  
  const tipoInventario = itemPedido.id.startsWith('C')
      ? 'computador'
      : 'smartphone';
  
  const jobChecarInventario = createMessage({
      payload: itemPedido,
      header: msg.header,
  });
  
  if(tipoInventario === 'computador') {
    channels.ChecarInventarioComputador.sendToChanel(jobChecarInventario);
  } else {
    channels.ChecarInventarioSmartphone.sendToChanel(jobChecarInventario);
  }
}

channels.itemPedido.subscribe(router);