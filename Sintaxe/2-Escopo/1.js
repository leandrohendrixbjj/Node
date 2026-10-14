"use strict"

/**
 * ──────────────────────────────────────────────
 *  💡 VAR: Escopo e comportamento no JavaScript
 * ──────────────────────────────────────────────
 *
 *  • Ao declarar uma variável com `var`, ela pertence ao escopo da FUNÇÃO,
 *    mesmo que esteja dentro de um bloco (if, for, etc).
 *
 *  • Escopo determina ONDE uma variável pode ser acessada no código:
 *      - Funções
 *      - Blocos { }
 *
 *  ⚠️ Melhor evitar o uso do `var` (prefira let/const):
 *      - Pode causar vazamentos de escopo inesperados!
 *
 *  Exemplo abaixo mostra o "vazamento" de escopo
 * ──────────────────────────────────────────────
 */

console.clear()


function data(){  
  
  for(var row = 0; row < 5; row++){    
    console.log(row)
  }
  
  row = 10
  console.log('Vaza escopo', row)
  
}

data()