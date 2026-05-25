const channel = require('./channel');

const PEDIDO_CRIADO = 'pedido_criado';

// Publisher
function publicarPedidoCriado(pedido, message) {
  channel.publish(PEDIDO_CRIADO, message);
}

// Consumer
function onPedidoCriado(handler) {
  channel.subscribe(PEDIDO_CRIADO, handler);
}

module.exports = {
  publicarPedidoCriado,
  onPedidoCriado
};
