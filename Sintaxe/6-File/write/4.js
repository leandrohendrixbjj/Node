console.clear();

/* 
  Escrita síncrona (bloqueia o processo)

  Comportamento
   - Bloqueia o Event Loop até que a escrita seja concluída 
   - Não é recomendado usar em ambientes de produção
*/

const fs = require('fs');

fs.writeFileSync('arquivo.txt', 'Escrita síncrona (bloqueia o processo)');

