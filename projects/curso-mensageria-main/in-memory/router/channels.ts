import { createChannel } from "../publisherConsumer/channel.interface.ts";

export const channels = Object.freeze({
  
  pedido: createChannel('Pedido'),
  itemPedido: createChannel('item_pedido_spliter'),
  
  inventarioComputador: createChannel('inventario_computador'),
  inventarioSmartphone: createChannel('inventario_smartphone'),

  estoqueItemPedido: createChannel('estoque_item_pedido'),
  estoquePedido: createChannel('estoque_pedido'),

  pendenciaFinanceiroVerificada: createChannel('pendencia_financeiro_verificada'),

  novoPedidoValido: createChannel('novo_pedido_valido'),

  pedidoPodeSerAtendido: createChannel('pedido_pode_ser_atendido'),
});