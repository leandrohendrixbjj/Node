/*
  A tradução literal de callback é "retorno de chamada".

  Callback é uma função passada como argumento para outra função, para que ela seja executada em um momento específico. 
  Pode ser usada tanto em operações síncronas quanto assíncronas.

  Exemplo abaixo trata uma operação assíncrona.
  
*/

"use strict";

console.clear();

function garcon(callback) {
    const pedido = Math.floor(Math.random() * 1000) + 1;

    console.log(`Envia pedido ${pedido} para cozinha`);

    setTimeout(() => {
        callback(pedido);
    }, 1000);

    console.log("Atendendo outros clientes");
}

function delivery(pedido) {
    console.log(`Pedido ${pedido} liberado pela cozinha`);
}

for(let i = 0; i < 2; i++) {
  garcon(delivery);
}