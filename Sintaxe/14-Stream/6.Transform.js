"use strict";

const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");

const SOURCE = path.join(__dirname, "files/entrada.txt");
const DEST = path.join(__dirname, "files/saida.txt");

/**
 * ## STREAMS: LEITURA → TRANSFORMAÇÃO → GRAVAÇÃO
 * ================================================
 * ### Transform Streams
 * As Transform Streams são úteis quando você precisa modificar os dados enquanto eles estão passando pelo fluxo.
 * 
 * Muito comum com gzip => arquivo.txt -> gzip -> arquivo.txt.gz  
 *
 * ### 1) Readable (`createReadStream`)
 * - Abre o arquivo de origem SEM CARREGAR TUDO NA RAM.
 * - Os dados chegam em **chunks**, sob demanda.
 *
 * ### 2) Writable (`createWriteStream`)
 * - Destino: recebe os chunks e persiste no disco.
 *
 * ### Fluxo (resumo)
 *
 * ```
 * entrada.txt  →  [ Readable ]  →  chunks
 *                                      ↓
 *                               [ Transform ]  (ex.: maiúsculas)
 *                                      ↓
 *                               [ Writable ]  →  saida.txt
 * ```
 *
 * Arquivos grandes ficam viáveis porque o processamento é **pedaço a pedaço**,
 * com **backpressure** gerenciado pelo encadeamento `.pipe()`.
 */

const read = fs.createReadStream(SOURCE);
const write = fs.createWriteStream(DEST);

console.log(`[copy] início: ${SOURCE} → ${DEST}`);

class UpperCase extends Transform {
  _transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
}

const upper = new UpperCase();

read.pipe(upper).pipe(write);

write.on("finish", () => {
  console.log("[copy] concluído");
});

write.on("error", (err) => {
  console.error("[copy] gravação:", err.message);
});

read.on("error", (err) => {
  console.error("[copy] leitura:", err.message);
});
