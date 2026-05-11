console.clear();

/*
 * Leitura assíncrona com callback
 *
 * Vantagens: 
 *  - Muito simples
 *  - Não bloqueia a aplicação enquanto lê o arquivo 
 */

const fs = require('fs')

fs.readFile('arquivo.txt', 'utf8', (erro, dados) => {
  if (erro) {
    console.error(erro)
    return
  }

  console.log(dados)
})

