import { createChannel } from "../publisherConsumer/channel.interface.ts";

export const channels = Object.freeze({
  
  pedido: createChannel('Pedido'),
  itemPedido: createChannel('item_pedido'),
  
  inventarioComputador: createChannel('inventario_computador'),
  inventarioSmartphone: createChannel('inventario_smartphone'),
});