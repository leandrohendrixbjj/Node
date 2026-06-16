"use strict";

console.clear();

/*
 * O que é uma Promise?
 *
 * Uma Promise representa um valor que estará disponível no futuro.
 *
 * Analogia — pedido em uma pizzaria:
 *
 *   Pedido realizado  →  Promise criada
 *   Pizza pronta      →  Promise resolvida
 *   Pizzaria fechou   →  Promise rejeitada
 *
 * Em Node.js, operações como:
 *
 *   - Consultas ao banco
 *   - Chamadas HTTP
 *   - Leitura de arquivos
 *   - Filas (RabbitMQ, Pub/Sub)
 *
 * normalmente são assíncronas e retornam Promises.
 */

async function chamadaAPI() {
  return await Promise.resolve("Resposta da API");
}

console.log("Iniciando a chamada da API");
chamadaAPI().then(console.log);
console.log("Continuando o código");