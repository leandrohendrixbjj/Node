"use strict";

/**
 * Macrotask de exemplo: `setTimeout(fn, 0)` agenda `fn` na **fila de timers**
 * do event loop — não roda no meio do código síncrono; só depois que o
 * stack atual termina e as **microtasks** (aqui, o `.then` da Promise) acabam.
 *
 * Saída esperada: A → E → C → D
 * - A, E: síncrono (ordem no arquivo).
 * - C: microtask (Promise), drenada antes da próxima fase do loop.
 * - D: macrotask (`setTimeout`), primeira chance na fase timers.
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

// Código síncrono
console.log("E");