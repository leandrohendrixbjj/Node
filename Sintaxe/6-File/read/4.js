console.clear();

/* 
  Stream: Leitura de forma assíncrona 

  Comportamento
   - Leitura em partes (chunks)
   - Não bloqueia o Event Loop
   - Usado para lidar com arquivos grandes
*/

const fs = require('fs');

const stream = fs.createReadStream('grande.txt', {
  encoding: 'utf8'
});

stream.on('data', (chunk) => {
  console.log('Chunk recebido:');
  console.log(chunk);
});

stream.on('end', () => {
  console.log('Leitura finalizada');
});

stream.on('error', (err) => {
  console.error('Erro:', err);
});

