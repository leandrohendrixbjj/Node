console.clear();

/*
 * O que async faz:
 *
 *   - Transforma a função em uma Promise
 *   - Retorna uma Promise
 *
 *   Equivalente a: function exemplo() { return Promise.resolve(10) }
 *
 * O que await faz:
 *
 *   - Aguarda a Promise ser resolvida sem bloquear o Node.js
 *   - await só funciona dentro de funções async.
 *
 * Fluxo:
 *
 *   await encontra Promise
 *        ↓
 *   função pausa execução
 *        ↓
 *   event loop continua rodando
 *        ↓
 *   Promise resolve
 *        ↓
 *   função continua
 */

async function score() {
  return await Promise.resolve(10);
}

score().then(console.log);
