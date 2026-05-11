"use strict";

/**
 * Stack e alocação em tempo de compilação
 *
 * Quando você compila seu código, o compilador pode examinar os tipos de
 * dados primitivos e calcular antecipadamente a quantidade de memória
 * necessária. Essa quantidade é alocada para o programa no espaço da call
 * stack. O espaço onde essas variáveis são alocadas é chamado de espaço de
 * pilha: conforme as funções são chamadas, sua memória é incluída no topo da
 * memória existente; quando terminam, são removidas em ordem LIFO
 * (last-in, first-out).
 *
 * Exemplo de declarações: */
 
 const n = 4; // number - 4 bytes
 const x = [1, 2, 3, 4]; // array of 4 elements, each 4 bytes
 const m = 8; // number - 8 bytes
 
 /* O compilador pode ver imediatamente que o código requer:
 *
 *     4 + (4 × 4) + 8 = 28 bytes
 *
  * O compilador insere código que interage com o sistema operacional para
 * solicitar na stack o número de bytes necessário para armazenar suas
 * variáveis.
 *
 * No exemplo acima, o compilador conhece o endereço de memória exato de cada
 * variável. De fato, sempre que escrevemos na variável `n`, isso é traduzido
 * internamente para algo como “endereço de memória 4127963”.
 */
