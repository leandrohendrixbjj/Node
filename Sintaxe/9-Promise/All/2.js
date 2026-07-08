// Promise.all(): Somente retorna o resultado se todas as Promises forem resolvidas.

"use strict";

console.clear();

async function executar() { 
  try {
    const resultado = await Promise.all([
      Promise.resolve("A"),
      Promise.reject("Grupo de Promises: não será executado"),
      Promise.resolve("C")
    ]);
    return resultado;
  } catch (erro) {
    console.log(erro);
  }
}

executar().then((data) => {
  if (data) {
    console.log(data);
  }
}).catch((error) => {
  console.log(error);
});