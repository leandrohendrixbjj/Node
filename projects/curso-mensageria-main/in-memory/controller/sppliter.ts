import { createMessage, type Message } from "../domain/message.ts";
import type { Pedido } from "../domain/pedido.interface.ts";
import { Timestamp } from "../domain/timestamp.ts";
import { channels } from "../router/channels.ts";

export function splitter(message: Message)  {
  const pedido: Pedido = JSON.parse(message.payload);

  //console.debug('[splitter] itens do pedido:', pedido.itens);

  for (const itemPedido of pedido.itens) {
    const novoItemPedido = createMessage({
      id: undefined,
      header: {
        pedidoId: pedido.id,
        DataHora: Timestamp.now('America/Sao_Paulo'),
      },
      payload: itemPedido      
    });
    // Publica MSG itemPedido
    channels.itemPedido.sendToChanel(novoItemPedido);
  }
}

channels.pedido.subscribe(splitter);
