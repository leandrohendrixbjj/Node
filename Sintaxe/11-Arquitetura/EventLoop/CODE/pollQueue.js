"use strict";

/**
 * Fase POLL (I/O de rede) — o handler do `http.createServer` roda quando o
 * SO/libuv sinaliza atividade no socket (pedido chegou), não no meio do
 * código síncrono. Depende do event loop estar livre para enfileirar e
 * executar esse callback.
 *
 * 🔍 Explicação
 * A e E: código síncrono
 * B: process.nextTick (executa antes de tudo)
 * C: Promise (microtask)
 * D: setTimeout (macrotask)
 * 
 * Escutando: callback de `listen` (socket pronto).
 * Respondeu: handler HTTP ao receber o pedido (I/O, fase poll).
 * `http.get` no mesmo callback: pedido local para ver as duas linhas sem browser.
 */

console.clear();

const http = require("http");

// Código síncrono
console.log("A => Síncrono");

// Fase POLL (I/O de rede)
const server = http.createServer((req, res) => {
  res.end("ok");
  console.log("Respondeu => I/O (Fase POLL)");
});

// setTimeout (macrotask)
setTimeout(() => {
    console.log("D => Macrotask");
}, 0);

// Promise (microtask)
Promise.resolve().then(() => {
    console.log("C => Microtask");
});

// process.nextTick (executa antes de tudo)
process.nextTick(() => {
    console.log("B => process.nextTick");
});

// Código síncrono
console.log("E => Síncrono");

server.listen(0, () => {
    const { port } = server.address();
    http.get(`http://127.0.0.1:${port}/`, (resClient) => {
      resClient.resume();
    }).on("error", console.error);
  });