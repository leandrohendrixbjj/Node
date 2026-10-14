"use strict"

/**
 * ────────────────────────────────────────────────
 *   💡 LET: Escopo em JavaScript
 * ────────────────────────────────────────────────
 *
 * • Ao declarar uma variável com `let`, ela pertence ao BLOCO onde foi declarada,
 *   mesmo que esteja dentro de um if, for ou outro bloco.
 *
 * • Use `let` quando precisar mudar o valor da variável.
 *
 */

console.clear()

function data(){  

  try {
    for(let row = 0; row < 5; row++){    
      console.log(row)
    }
    
    row = 10 // Erro: row is not defined
    
  } catch (error) {    
    console.log("Não vaza escopo")
    console.log('Erro', error.stack)
  }
  
}

data()