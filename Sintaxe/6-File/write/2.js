console.clear();

// Escrita usando Promises (mais moderno e mais simples - Assíncrona)

const fs = require('fs/promises');

async function salvar() {
  try {
    await fs.writeFile('arquivo.txt', 'Escrita usando Promises');
    console.log('Arquivo gravado');
  } catch (err) {
    console.error(err);
  }
}

salvar();

