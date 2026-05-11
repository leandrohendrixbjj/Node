console.clear();

/*
 * Leitura usando Promises (moderna)
 *
 * Vantagens: 
 *  - Código mais limpo
 *  - Mais fácil de ler e entender
 *  - Mais fácil de testar
 */

const fs = require('fs/promises')

async function lerArquivo() {
  const conteudo = await fs.readFile('arquivo.txt', 'utf8')
  console.log(conteudo)
}

lerArquivo()

