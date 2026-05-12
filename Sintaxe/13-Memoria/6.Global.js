/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │                           GLOBAL (MEMÓRIA)                               │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 *  A variável bar é uma variável global acidental.  o JavaScript cria bar no escopo global (se não estiver em "use strict").
 *  
 *  Isso acontece porque ela foi criada sem: let, const ou var.
 * 
 * Nesse caso bar fica presa no escopo global e não será removida pelo GB
 * 
 *  Use variáveis ​​globais para armazenar dados se você precisar, mas quando fizer isso, certifique-se de atribuí-lo como 
 *  nulo ou reatribuí-lo quando terminar.
 */

function foo(arg) {
  bar = "some text"; // Variável global acidental
}

foo();

console.log(bar); // some text