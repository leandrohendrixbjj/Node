import { createChannel } from "../publisherConsumer/channel.interface.ts";

export const channels = Object.freeze({
  
  pedido: createChannel('Pedido'),
  itemPedido: createChannel('item_pedido_spliter'),
  
  inventarioComputador: createChannel('inventario_computador'),
  inventarioSmartphone: createChannel('inventario_smartphone'),

  statusItemPedido: createChannel('status_item_pedido'),
  statusPedido: createChannel('status_pedido'),
});