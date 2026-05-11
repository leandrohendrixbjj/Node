console.clear();

/* 
  Stream: Escrita de forma assíncrona 

  Comportamento
   - Escrita em partes (chunks)
   - Não bloqueia o Event Loop
   - Usado para lidar com arquivos grandes
*/

const fs = require('fs');

const stream = fs.createWriteStream('grande.txt');

stream.write('linha 1\n');
stream.write('linha 2\n');

stream.end();

