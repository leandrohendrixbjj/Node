class Pedido {
  constructor({ id, idCliente, itens }) {
    this.id = id;
    this.idCliente = idCliente;
    this.itens = itens;
  }

  getValorTotal() {
    return this.itens.reduce((total, item) => {
      return total + item.getTotal();
    }, 0);
  }
}

module.exports = Pedido;