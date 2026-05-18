export interface Pedido {
  id: string;
  idCliente: string;
  itens: ItemPedido[];
}

export interface ItemPedido {
  id: string;
  nome: string;
  quantidade: number;
  precoUnitario: number;
}
