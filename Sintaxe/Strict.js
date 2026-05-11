/**
 * O Strict Mode é uma forma de executar código JavaScript com regras mais rígidas, evitando comportamentos perigosos ou 
 * ambíguos da linguagem.

 * Ele é ativado com a instrução: "use strict"

 * Quando ativado, o JavaScript deixa de “tolerar” certos erros silenciosos e passa a lançar exceções, tornando o código
 * mais seguro e previsível.
 * 
 * Boas práticas:
  - Use "use strict" em projetos que utilizam require
  - Prefira ES Modules (import/export) em projetos novos
  - Evite misturar require com import
  - Use strict para prevenir bugs difíceis
 * 
 */

"use strict" 

// ❌ Variável não declarada

x = 10 // ❌ erro 


// ❌ Escrita em propriedade somente leitura

const obj = {};

Object.defineProperty(obj, 'x', { value: 10, writable: false })

obj.x = 20 // ❌ erro
