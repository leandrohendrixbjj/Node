console.clear();

/*
 * Leitura síncrona (mais simples)
 *
 * Vantagens:  Muito simples
 * Desvantagens: Bloqueia a aplicação enquanto lê o arquivo
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


