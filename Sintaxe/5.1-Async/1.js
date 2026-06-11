"use strict";

/*
 * Quando marcamos async em uma função:
 *
 *  1. A função sempre retornará uma Promise.
 *  2. Permite usar await dentro do seu corpo
 */

console.clear();

// Mesmo sem um await o retorno será uma Promise
async function data() {
  return 10;
}

console.log(data());


// Equivalente a:
function info() {
  return Promise.resolve(20);
}

console.log(info());

/*
 * Você pode ter uma função async sem nenhum await:
 *  → Isso é válido, embora muitas vezes seja desnecessário.
*/
async function soma(a, b) {
  return a + b;
}

console.log(soma(1, 2));