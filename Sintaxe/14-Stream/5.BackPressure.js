"use strict";

/**
 * ## 8) BACKPRESSURE (MUITO IMPORTANTE)
 * ------------------------------------
 *
 * Esse é um conceito avançado e fundamental.
 *
 * **O problema**
 * - leitura muito rápida
 * - escrita muito lenta
 *
 * **Exemplo**
 * - download rápido
 * - banco lento
 *
 * **Sem controle**
 * - memória explode
 * - fila cresce
 * - aplicação trava
 *
 * ## COMO O NODE RESOLVE ISSO
 * ---------------------------
 *
 * O Node pausa automaticamente a leitura quando o destino não consegue acompanhar.
 *
 * **Exemplo manual**:
 */ 
 const fs = require("fs");
 
 const read = fs.createReadStream("./bigfile.txt");
 const write = fs.createWriteStream("./copy.txt");
 
 read.on("data", (chunk) => {
   const canContinue = write.write(chunk);
 
   if (!canContinue) {
     read.pause();
   }
 });
 
 write.on("drain", () => {
   read.resume();
 });
 
 /*
 * **O que acontece aqui**
 * - `write.write()` retorna:
 *   - `true` → pode continuar
 *   - `false` → buffer cheio
 * - quando retorna `false`, chamamos `read.pause()` (pausa a leitura)
 * - `drain` dispara quando o buffer esvazia, então chamamos `read.resume()`
 */

