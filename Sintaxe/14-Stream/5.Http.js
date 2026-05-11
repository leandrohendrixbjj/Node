"use strict";

/**
 * Servidor HTTP mínimo: em GET /copy, lê `data.txt` e grava em `copy.txt`
 * usando `.pipe()`.
 *
 * O `pipe()` liga Readable → Writable e aplica backpressure: quando o buffer
 * do destino enche, a leitura pausa até o `drain`, evitando estourar memória.
 * 
 *  | Stream                       | Buffer               |
 *  | ---------------------------- | -------------------- |
 *  | Processa aos poucos          | Carrega tudo         |
 *  | Menor RAM                    | Mais RAM             |
 *  | Melhor para arquivos grandes | Melhor para pequenos |
 *  | Escalável                    | Pode travar          |
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const SOURCE = path.join(__dirname, "data.txt");
const DEST = path.join(__dirname, "copy.txt");

const server = http.createServer((req, res) => {  

  const readStream = fs.createReadStream(SOURCE, {
    highWaterMark: 16 * 1024, // chunks pequenos para ver o efeito em arquivos maiores
  });

  // Cria o stream de escrita.
  const writeStream = fs.createWriteStream(DEST);

  console.log(`[copy] início: ${SOURCE} → ${DEST}`);

  // Erro ao ler o arquivo de origem.
  readStream.on("error", (err) => {
    console.error("[copy] leitura:", err.message);
    writeStream.destroy(err);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    }
    res.end("Erro ao ler o arquivo de origem.\n");
  });

  // Erro ao gravar copy.txt.
  writeStream.on("error", (err) => {
    console.error("[copy] gravação:", err.message);
    readStream.destroy();
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    }
    res.end("Erro ao gravar copy.txt.\n");
  });

  // Concluído a gravação.
  writeStream.on("finish", () => {
    console.log("[copy] concluído (pipe aplicou backpressure automaticamente)");
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("OK: data.txt foi copiado para copy.txt via stream.pipe().\n");
  });

  readStream.pipe(writeStream);
});

server.listen(PORT, () => {
  console.log(`HTTP http://localhost:${PORT}`);  
});
