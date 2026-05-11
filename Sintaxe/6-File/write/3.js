console.clear();

/* 
  AppendFile: Adiciona conteúdo ao final do arquivo ( Muito usando para logs) 

  Comportamento
  - Cria o arquivo se não existir
  - Sobrescreve se já existir
  - Não bloqueia o event loop  
*/

const fs = require('fs');

fs.appendFile('arquivo.txt', '\nNova linha\n', (err) => {
  if (err) throw err;
  console.log('Linha adicionada');
});