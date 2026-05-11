"use strict";

/**
 * Fila `process.nextTick` — agenda callbacks para rodarem logo após o código
 * síncrono atual, antes de microtasks (ex.: Promises) e antes das fases
 * do event loop (timers, I/O, etc.).
 * 
 * 🔍 Explicação
 * A e E: código síncrono
 * B: process.nextTick (executa antes de tudo)
 * C: Promise (microtask)
 * D: setTimeout (macrotask)
 */

console.clear();

// Código síncrono
console.log("A");

// setTimeout (macrotask)
setTimeout(() => {
  console.log("D");
}, 0);

// Promise (microtask)
Promise.resolve().then(() => {
    console.log("C");
  });

// process.nextTick (executa antes de tudo)
process.nextTick(() => {
    console.log("B");
  });

// Código síncrono
console.log("E");