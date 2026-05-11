"use strict";

/**
 * Vazamento de memória (memory leak) em JavaScript
 *
 * O GC não resolve tudo: se ainda existir referência ao objeto, ele não será
 * removido.
 *
 * Exemplo clássico — cache que cresce sem limite:
 */
 const cache = [];
   app.get("/", (req, res) => {
   cache.push(req.headers);
 });
 
 /* Aqui:
 *
 * - o array cresce indefinidamente;
 * - as referências continuam vivas;
 * - a memória associada não é liberada.
 *
 * Resultado típico:
 *
 * - aumento do heap;
 * - mais pressão sobre o GC;
 * - risco de crash.
 *
 * ---
 *
 * Closures e vazamento */
 
 function outer() {
   const hugeData = new Array(1_000_000);
   
   return function inner() {
     console.log("oi");
   };
 }
 
 /* A closure pode manter `hugeData` vivo sem necessidade.
 *
 * ---
 *
 * Timers também seguram memória
 */
 setInterval(() => {
   console.log("running");
 }, 1000);
 
 /* Enquanto o timer existir:
 *
 * - a closure do callback continua viva;
 * - variáveis capturadas por essa closure permanecem na memória.
 */
