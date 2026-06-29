"use strict";

console.clear();

/*
 * Estados de uma Promise
 *
 * Uma Promise possui três estados:
 *
 *   - Pending (pendente)  
 *   - Fulfilled (resolvida)
 *   - Rejected (rejeitada)
 */

const promisePending = new Promise(() => {});

const promiseResolved = new Promise((resolve) => {
  resolve("Promise resolvida");
});

const promiseRejected = new Promise((resolve, reject) => {
  reject("Promise rejeitada");
});

console.log(promisePending);

console.log(promiseResolved);

console.log(promiseRejected);

promiseRejected.catch(erro => {
  console.log("Erro:", erro);
});