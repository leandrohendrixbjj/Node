"use strict"

/**
 * ────────────────────────────────────────────────
 *   💡 CONST: Escopo em JavaScript
 * ────────────────────────────────────────────────
 *
 * • Ao declarar uma variável com `const`, ela pertence ao BLOCO onde foi declarada,
 *   mesmo que esteja dentro de um if, for ou outro bloco.
 *
 * • Use `const` quando precisar declarar uma variável que não será alterada.
 *
 */

console.clear()


const data = 'John Doe'

// Não pode alterar o valor da variável
try {
  data = 'Jane Doe'  
} catch (error) {
  console.log("Não pode alterar o valor da variável")
}


// Não vaza o escopo
function info(){
  if (true){
    const age = 30
    console.log('Age:', age)
  }
  console.log('Não acessa o escopo', age)
}

try {
  info()  
} catch (error) {
  console.log("Const: Não vaza o escopo")
}


// Permite alteração porque você mudou a propriedade, não a variável.
const person = {
  name: 'John Doe',
  age: 30,
  city: 'New York'
}

person.name = 'Ana'

console.log('Person', person)