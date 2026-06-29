"use strict";

console.clear();

/*
  Promise.all(): O comportamento em caso de erro. 

  Para que o Promise.all() retorne o resultado, todas as Promises devem ser resolvidas. Caso uma Promise seja rejeitada,  
  o Promise.all() retorna o erro da Promise rejeitada.'
*/

async function executar() { 
  try {
    const resultado = await Promise.all([
      Promise.resolve("OK 1"),
      Promise.reject("Erro na Promise 2"),
      Promise.resolve("OK 2")
    ]);
    console.log(resultado);
  } catch (erro) {
    console.log(erro);
  }
}

executar();