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
 * O async abaixo é redundante. ( Já que o fetch já retorna uma Promise. )
 */

async function buscarUsuarios() {
    return fetch(url);
}

/*
 * O await abaixo também é redundante, ( Já que o fetch já retorna uma Promise. ) 
 */

async function buscarUsuarios() {
    return await fetch(url);
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
