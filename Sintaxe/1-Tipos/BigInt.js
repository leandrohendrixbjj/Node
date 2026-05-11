console.clear()
/* 
  BigInt é um tipo nativo do JavaScript para representar inteiros arbitrariamente grandes, 
  sem limite de precisão. Usando n no final
*/

const numeroGrande = BigInt("9007199254740991123123123123")
const tipo = typeof numeroGrande
console.log("O tipo da variável numeroGrande é:", tipo)


// Conversão de tipos
const idade = 10
const idadeBigInt = BigInt(idade)

console.log("A idade em BigInt é:", idadeBigInt)

