"use strict";

console.clear();

/*
 * O finally() é o último pedaço importante para fechar o ciclo de uma Promise.
 *
 * Até agora você já entendeu:
 *
 *   - Pending              → aguardando
 *   - Fulfilled (resolve)  → sucesso
 *   - Rejected (reject)    → erro
 *
 * O finally() é executado quando a Promise deixa o estado Pending,
 * independentemente de ter dado sucesso ou erro.
 */

// Caso de sucesso
const promiseSuccess = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve("Promise resolvida com sucesso!");
  }, 3000);
});

promiseSuccess.then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
}).finally(() => {
  console.log("Finalizado com sucesso!");
});

// Caso de erro
const promiseError = new Promise((resolve,reject) => {
  setTimeout(() => {
    reject("Promise rejeitada com erro!");
  }, 3000);
});

promiseError.then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
}).finally(() => {
  console.log("Finalizado com erro!");
});