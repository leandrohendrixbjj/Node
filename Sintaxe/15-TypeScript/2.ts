"use strict";

console.clear();


function nomeCapitalizado(nome: string): string {
  if (!nome) {
    return "Nome não informado";
  }
  return nome.toUpperCase();
}

console.log(nomeCapitalizado("João")); 

// console.log(nomeCapitalizado(100)); Error: Argument of type 'number' is not assignable to parameter of type 'string'.console.log(nomeCapitalizado(100)); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.