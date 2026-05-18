const pedidoChannel = require('../channel/pedidoChannel');

class Publisher {
  constructor(payload, message) {
    this.payload = payload;
    this.message = message;
  }

  publicarPedidoCriado() {
    pedidoChannel.publicarPedidoCriado(this.payload, this.message);
  }
}

module.exports = Publisher;
