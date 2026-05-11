"use strict";

const descriptions = {
  rss: "Memória total utilizada pelo processo Node.js",
  heapTotal: "Memória total reservada pelo V8",
  heapUsed: "Memória atualmente usada pelos objetos JavaScript",
  external: "Memória usada fora do heap do V8",
  arrayBuffers: "Memória usada por Buffers e ArrayBuffers",
};

const format = (bytes) => {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const memory = process.memoryUsage();

console.log("\n=== Uso de Memória ===\n");

for (const key in memory) {
  console.log(
    `${key}: ${format(memory[key])}\n-> ${descriptions[key]}\n`
  );
}