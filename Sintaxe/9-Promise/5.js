"use strict";

console.clear();

// Encadeamento (Chaining)

Promise.resolve(10)
  .then(valor => valor + 2)
  .then(valor => valor + 5)
  .then(valor => {
    console.log(valor);
});


// Tratamento de erro em cadeia

Promise.resolve()
  .then(() => {
    throw new Error("Erro na etapa 1");
  })
  .then(() => {
    console.log("Não executa");
  })
  .catch(erro => {
    console.log(erro.message);
  });