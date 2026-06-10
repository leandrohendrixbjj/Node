"use strict";

  /*
  * O que é Axios?
  * Axios é uma biblioteca para realizar requisições HTTP.

    * Ela oferece:
    * Interceptors
    * Timeout configurável
    * Transformação automática de JSON
    * Melhor tratamento de erros
*/

console.clear();

// Código redundante
async function buscarUsuarios() {
    return await axios.get(url);
}

// Normalmente pode ser simplificado para:
function buscarUsuarios() {
  return axios.get(url);
}

// OU

async function buscarUsuarios() { 
  return axios.get(url); 
}


/*
  * Quando return await faz sentido
  * Principalmente com try/catch. 
  * Nesse caso o await permite que o try/catch capture rejeições da Promise.
*/

async function buscarUsuarios() {
    try {
        return await axios.get(url);
    } catch (erro) {
        console.error(erro);
        throw erro;
    }
}

