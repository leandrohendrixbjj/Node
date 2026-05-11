"use strict";

/**
 * READABLE => Usada para leituras
 * ## EVENTOS IMPORTANTES (READABLE STREAM)
 * --------------------------------------
 *
 * | Evento | Descrição               |
 * | ------ | ----------------------- |
 * | data   | Quando chega um chunk   |
 * | end    | Final da leitura        |
 * | error  | Erro                    |
 * | close  | Stream encerrada        |
 */

console.clear();

const fs = require("fs");

const readable = fs.createReadStream("../../bigfile.txt");

// Quando chega um chunk
readable.on("data", (chunk) => {
  console.log(chunk.toString());
});

// Quando finaliza a leitura
readable.on("end", () => {
  console.log("Finalizado");
});