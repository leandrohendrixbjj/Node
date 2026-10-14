'use strict'

/*
 * BIGINT
 *
 * Tipo nativo do JavaScript para inteiros arbitrariamente grandes,
 * sem limite de precisão.
 *
 * O sufixo n marca um literal BigInt:
 *
 *   9007199254740991n
 */

console.clear()

// Literal BigInt
const numeroGrande = BigInt("9007199254740991123123123123")
const tipo = typeof numeroGrande
console.log("O tipo da variável numeroGrande é:", tipo)


// Conversão de tipos
const idade = 10
const idadeBigInt = BigInt(idade)

console.log("A idade em BigInt é:", idadeBigInt)

