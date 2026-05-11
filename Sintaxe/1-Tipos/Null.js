console.clear()

/* 
  Null é um tipo primitivo que ausência intencional de valor. Indica que uma variável não tem valor.

  | null                          | undefined                     |
  | ----------------------------- | ----------------------------- |
  | Ausência intencional          | Variável não definida         |
  | Definido manualmente          | Automático do JS              |
  | Representa “vazio consciente” | Representa “não existe ainda” |
  | É convertido implicitamente para 0 em operações aritméticas.  |
  | Undefined em operações aritméticas é convertido para NaN. |


*/

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
