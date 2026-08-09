/*
  process.argv: é um array que armazena os argumentos passados na linha de comando quando uma aplicação é iniciada.
  utilitário para acessar os argumentos passados na linha de comando.

   - Tudo que vem de process.argv é uma string.

  Util:
  
    - configurar variáveis ou opções sem depender exclusivamente de arquivos de ambiente.
    - construir scripts que se comportem de maneira diferente conforme os argumentos passados durante a execução.

*/
"use strict";

console.clear();


/* Se executar: node {caminho do arquivo} Leandro 10:
    [
      '/home/hendrix/.nvm/versions/node/v23.6.0/bin/node', => caminho do node
      '/home/hendrix/estudos/Node/server.js' => caminho do arquivo js
      'Leandro', => primeiro argumento
      '10' => segundo argumento (string)
    ] 
*/

console.log(process.argv);

const name = process.argv[2];
const age = Number(process.argv[3]);

console.log(`${name} tem ${age} anos de idade.`);



