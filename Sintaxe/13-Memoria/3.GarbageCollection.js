"use strict";

/**
 * O que é Garbage Collection?
 *
 * Garbage Collection é o processo de identificar objetos que não estão mais
 * sendo usados pelo programa e liberar a memória deles.
 *
 * Exemplo: */
 
 let user = {
    name: "Leandro",
 }; 
 user = null;
 
 /* Nesse momento:
 *
 * - O objeto `{ name: "Leandro" }` ficou sem referência.
 * - O GC entende que ninguém mais consegue acessar esse objeto.
 * - Então a memória pode ser liberada.
 *
 *  Se você NÃO fizer: user = null, objeto continua referenciado pela variável user, log:
 * 
 * - o objeto ainda é alcançável
 * - o GC considera ele “vivo”
 * - a memória NÃO será liberada
 *
 * Algoritmos usados no V8 para viabilizar a higienização de memória
 *
 * O V8 combina vários algoritmos:
 *
 * | Algoritmo           | Objetivo                            |
 * | ------------------- | ----------------------------------- |
 * | Mark-and-Sweep      | Encontrar lixo                      |
 * | Mark-Compact        | Reduzir fragmentação                |
 * | Scavenge            | Limpeza rápida da Young Generation  |
 * | Incremental Marking | Evitar pausas grandes               |
 * | Concurrent GC       | Rodar em paralelo                   |
 */
