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

const pending = new Promise(() => {});

const resolved = new Promise((resolve) => {
  resolve('Promise resolvida');
});

const rejected = new Promise((resolve, reject) => {
  reject('Promise rejeitada');
})

console.log(pending);
console.log(resolved);

rejected.catch((error) => {
  console.log(error);
});