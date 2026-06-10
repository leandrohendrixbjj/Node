"use strict";

/*
  * O que é fetch?
  * fetch é a API nativa do JavaScript para realizar requisições HTTP.
  * Não precisa instalar biblioteca — já vem no Node (18+) e no navegador.

    * Diferenças em relação ao Axios:
    * Não rejeita automaticamente em status 4xx/5xx (precisa verificar response.ok)
    * JSON não é convertido automaticamente (usa response.json())
    * Não tem interceptors nativos
    * Timeout precisa ser implementado manualmente (AbortController)
*/

console.clear();

const url = "https://jsonplaceholder.typicode.com/users";

// Código redundante
async function buscarUsuarios() {
  const response = await fetch(url);
  return await response.json();
}

// Normalmente pode ser simplificado para:
function buscarUsuarios() {
  return fetch(url).then((response) => response.json());
}

// OU

async function buscarUsuarios() {
  const response = await fetch(url);
  return response.json();
}


/*
  * Quando return await faz sentido
  * Principalmente com try/catch.
  * Nesse caso o await permite que o try/catch capture rejeições da Promise.
*/

async function buscarUsuarios() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (erro) {
    console.error(erro);
    throw erro;
  }
}
