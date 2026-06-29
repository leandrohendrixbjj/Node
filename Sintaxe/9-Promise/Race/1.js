/**
 * Promise.race()
 *
 * Costuma causar confusão porque o nome sugere que a primeira Promise resolvida vence a corrida. Na verdade, não é isso.
 *
 * A definição correta é: a primeira Promise que sair do estado pending vence, independentemente de ela ser 
 * fulfilled (resolve) ou rejected (reject)
 * 
 * Como funciona internamente;
 * P1 ───────────── resolve (3s)
 * P2 ───── reject (1s)
 * P3 ───────── resolve (2s)
 * 
 * O resultado é P2, porque é a primeira Promise que sai do estado pending. Mesmo sendo um erro (reject).
 * 
 * 
 */
"use strict";

console.clear();

const p1 = new Promise(resolve => {
  setTimeout(() => resolve("Banco A"), 3000);
});

const p2 = new Promise(resolve => {
  setTimeout(() => resolve("Banco B"), 1000);
});

Promise.race([p1, p2])
  .then(resultado => {
      console.log(resultado);
  });
