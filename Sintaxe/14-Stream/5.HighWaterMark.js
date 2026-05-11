"use strict";

/**
 * ## O QUE É `highWaterMark`
 * --------------------------
 *
 * O `highWaterMark` define o tamanho máximo do **buffer interno** da stream.
 *
 * **Exemplo**: `highWaterMark: 64 * 1024` → 64 KB (65.536 bytes).
 *
 * O Node.js tende a ler o arquivo em pedaços de **aproximadamente** esse tamanho.
 *
 * ## FLUXO (ARQUIVO DE ~1 GB)
 * ---------------------------
 *
 * ```
 * 1 GB
 *  ├── 64 KB
 *  ├── 64 KB
 *  ├── 64 KB
 *  └── …
 * ```
 *
 * Cada pedaço vira um `chunk` no evento `"data"`.
 *
 * ## OBSERVAÇÃO
 * ------------
 *
 * Mesmo com 64 KB, `chunk.length` pode variar um pouco conforme o SO e o fim do arquivo.
 */

console.clear();

const fs = require("fs");

let totalChunks = 0;

const readable = fs.createReadStream("bigfile.txt", {
  highWaterMark: 64 * 1024,
});

readable.on("data", (chunk) => {
  totalChunks++;
  console.log(`Chunk #${totalChunks} - ${chunk.length} bytes`);
});

readable.on("end", () => {
  console.log("Finalizado");
  console.log(`Total de chunks: ${totalChunks}`);
});
