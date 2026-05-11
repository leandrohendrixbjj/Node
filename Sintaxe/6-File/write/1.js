console.clear();

/*
  Escrita simples (assíncrona – mais comum)

  Comportamento:

  - Cria o arquivo se não existir
  - Sobrescreve se já existir
  - Não bloqueia o event loop
*/

const fs = require('fs');

fs.writeFile('arquivo.txt', 'Escrita simples (assíncrona – mais comum)', (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Arquivo gravado com sucesso');
});

