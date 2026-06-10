"use strict";

/*
 * Um detalhe importante:
 *  → funções async não rodam em outra thread ou em paralelo.
 *  → Elas rodam na mesma thread do Event Loop.
 *  → async não cria paralelismo.
*/

console.clear();

// Nada ficou assíncrono aqui.
async function teste() {
  console.log('A');
}

console.log('B');
teste();
console.log('C');