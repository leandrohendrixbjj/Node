"use strict";

console.clear();

/*
 * Perceba que uma Promise sempre segue este fluxo:
 *
 *                  +---------+
 *                  | Pending |
 *                  +---------+
 *                    /     \
 *                   /       \
 *                  v         v
 *         +-----------+     +-----------+
 *         | Fulfilled |     | Rejected  |
 *         +-----------+     +-----------+
 *
 *   - Pending                → ainda executando
 *   - Fulfilled (Resolved)   → terminou com sucesso
 *   - Rejected               → terminou com erro
 *
 * Depois que ela sai de Pending, o estado nunca mais muda novamente
 */

const promessa = new Promise((resolve) => {
  console.log("Executando...");

  setTimeout(() => {
    resolve("Concluído!");
  }, 3000);
});

console.log(promessa); // Pending

setTimeout(() => {  
  console.log(promessa); // Fulfilled após 3 segundos
}, 4000);