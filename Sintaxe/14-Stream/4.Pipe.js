"use strict";

/**
 * ## PIPE — O CONCEITO MAIS IMPORTANTE
 * -----------------------------------
 *
 * `pipe()` conecta streams, passando os dados de uma stream de leitura (Readable)
 * para uma stream de escrita (Writable).
 *
 * **Fluxo**: arquivo → stream de leitura → stream de escrita
 *
 * **Exemplo clássico**:
 */
 
 console.clear();

 const fs = require("fs");
 
 const read = fs.createReadStream("./entrada.txt");
 const write = fs.createWriteStream("./copia.txt");
 
 read.pipe(write);
 
 /*
 * ## COMO O `pipe()` FUNCIONA (POR CIMA)
 * -------------------------------------
 *
 * O `pipe()`:
 * - controla o fluxo
 * - evita excesso de memória
 * - gerencia backpressure automaticamente
 *
 * Isso é uma das grandes vantagens.
 */

