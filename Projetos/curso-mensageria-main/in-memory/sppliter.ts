import { createMessage, type Message } from "./message";
import type { Pedido } from "./pedido.interface";
import { Timestamp } from "./timestamp";
import { channels } from "./channels";

export function splitter(message: Message)  {
  const pedido: Pedido = JSON.parse(message.payload);

  console.debug('[splitter] Pedido recebido:', pedido);

  for (const itemPedido of pedido.itens) {
    const novoItemPedidoMsg = createMessage({
      payload: itemPedido,
      header: {
        pedidoId: pedido.id,
        DataHora: Timestamp.now('America/Sao_Paulo'),
      },
    });
    // Canal itemPedido envia a mensagem
    channels.itemPedido.sendToChanel(novoItemPedidoMsg);
  }
}

// Esculta a mensagem do canal novoPedido
channels.novoPedido.subscribe(splitter);