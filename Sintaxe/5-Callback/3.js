// Exemplo abaixo trata uma operação síncrona.

"use strict";

console.clear();

function garcon(callback) {
    const pedido = Math.floor(Math.random() * 1000) + 1;

    console.log(`Envia pedido ${pedido} para cozinha`);

    callback(pedido);

    console.log("Atendendo outros clientes");
}

function delivery(pedido) {
    console.log(`Pedido ${pedido} liberado pela cozinha`);
}

garcon(delivery);
