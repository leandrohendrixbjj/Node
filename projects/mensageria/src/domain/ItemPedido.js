class ItemPedido {
  constructor({ id, nome, quantidade, precoUnitario }) {
    this.id = id;
    this.nome = nome;
    this.quantidade = quantidade;
    this.precoUnitario = precoUnitario;
  }

  getTotal() {
    return this.quantidade * this.precoUnitario;
  }
}

module.exports = ItemPedido;