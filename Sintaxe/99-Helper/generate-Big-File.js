// generate-file.js
// Script para gerar um arquivo texto de ~1GB usando streams no Node.js
// Cada linha é numerada para facilitar saber em que ponto do arquivo você está.

const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "bigfile.txt");

// 1 GB em bytes
const TARGET_SIZE = 1024 * 1024 * 1024;

// Conteúdo repetido em cada linha (o número vem antes)
const LINE_BODY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Stream em Node.js.";

const stream = fs.createWriteStream(FILE_PATH, {
  encoding: "utf8",
});

let writtenBytes = 0;
let lineNum = 0;
let lastLoggedMb = -1;

function formatLine(n) {
  return `${String(n).padStart(8, "0")} | ${LINE_BODY}\n`;
}

function write() {
  let canWrite = true;

  while (writtenBytes < TARGET_SIZE && canWrite) {
    lineNum += 1;
    const line = formatLine(lineNum);
    const lineSize = Buffer.byteLength(line);

    canWrite = stream.write(line);
    writtenBytes += lineSize;

    const bucket50Mb = Math.floor(writtenBytes / (50 * 1024 * 1024));
    if (bucket50Mb > lastLoggedMb) {
      lastLoggedMb = bucket50Mb;
      console.log(
        `Progresso: ${(writtenBytes / 1024 / 1024).toFixed(0)} MB | última linha: ${lineNum}`
      );
    }
  }

  // Controle de backpressure
  if (writtenBytes < TARGET_SIZE) {
    stream.once("drain", write);
  } else {
    stream.end();
  }
}

stream.on("finish", () => {
  console.log("Arquivo gerado com sucesso!");
  console.log(`Arquivo: ${FILE_PATH}`);
  console.log(`Linhas escritas: ${lineNum}`);
  console.log(
    `Tamanho aproximado: ${(writtenBytes / 1024 / 1024 / 1024).toFixed(2)} GB`
  );
});

stream.on("error", (err) => {
  console.error("Erro ao gerar arquivo:", err);
});

write();
