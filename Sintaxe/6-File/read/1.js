console.clear();

/*
 * Leitura síncrona (mais simples)
 *
 * Vantagens:  Muito simples
 * Desvantagens: Bloqueia a aplicação enquanto lê o arquivo ( Bloqueio de Thread)
 * 
 * Durante esse período:

  - Nenhum callback é executado.
  - Nenhum setTimeout é processado.
  - Nenhuma requisição HTTP recebe resposta.
  - Nenhum evento é tratado.
 *
 * Fluxo:
 *
 *   Início
 *      ↓
 *   readFileSync()
 *      ↓
 *   ⛔ BLOQUEIA O EVENT LOOP
 *      ↓
 *   Lê o arquivo
 *      ↓
 *   Continua execução
 */

const fs = require('fs');

const conteudo = fs.readFileSync('arquivo.txt', 'utf8');

console.log(`Conteúdo do arquivo: ${conteudo}`);


