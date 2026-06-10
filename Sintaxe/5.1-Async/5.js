"use strict";

  /*
  * O que é o Fetch?
  * Fetch é uma API nativa do navegador e do Node.js moderno para realizar requisições HTTP.

  * Exemplo:

  * fetch("https://api.exemplo.com/usuarios");

  * O Fetch já retorna uma Promise.
*/

console.clear();

/*
 * Fetch retorna uma Promise.
 */

function buscarUsuarios() {
    return fetch(url);
}

/*
 * O async abaixo é redundante.
 */

async function buscarUsuarios() {
    return fetch(url);
}

/*
 * O await abaixo também é redundante,
 * pois apenas repassa a Promise.
 */

async function buscarUsuarios() {
    return await fetch(url);
}

/*
 * Agora o await passa a fazer sentido,
 * pois queremos tratar erros localmente.
 */

async function buscarUsuarios() {
    try {
        return await fetch(url);
    } catch (erro) {
        console.error(erro);
        throw erro;
    }
}

/*
 * Em aplicações reais, normalmente
 * verificamos response.ok.
 */

async function buscarUsuarios() {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}
