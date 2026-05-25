import { createChannel } from "./channel.interface";

export const channels = Object.freeze({
  novoPedido: createChannel('novo_pedido'),
  itemPedido: createChannel('item_pedido'),
  ChecarInventarioComputador: createChannel('checar_inventario_computador'),
  ChecarInventarioSmartphone: createChannel('checar_inventario_smartphone'),
});