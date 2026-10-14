'use strict'

/**
 * NULL
 * 
 * Null é um tipo primitivo do JavaScript que representa a AUSÊNCIA INTENCIONAL de valor —
 * ou seja, informa que uma variável "não tem valor nenhum" de propósito.
 * 
 * Tabela comparativa: null vs. undefined
 *
 * ╔══════════════════════════════════════╦══════════════════════════════════════╗
 * ║ null                                ║ undefined                           ║
 * ╠══════════════════════════════════════╬══════════════════════════════════════╣
 * ║ Ausência intencional                ║ Variável não definida                ║
 * ║ Definido manualmente                ║ Gerado automaticamente pelo JS       ║
 * ║ "Vazio consciente"                  ║ "Ainda não existe"                   ║
 * ║ Vira 0 em operações aritméticas     ║ Vira NaN em operações aritméticas    ║
 * ╚══════════════════════════════════════╩══════════════════════════════════════╝
 * 
 */

console.clear()

console.log(typeof null) // object (bug do JavaScript)

let a
console.log(a) // undefined

const b = null
console.log(b) // null

if (null) {
  console.log("Nunca entra")
}

//Pegadinha
console.log(null == undefined) // true
console.log(null === undefined) // false

// Operações aritméticas
console.log(null + 1) // 1
console.log(undefined + 1) // NaN
