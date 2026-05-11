console.clear();


/**
 * Filter: Filtra os elementos do array com base em uma condição
 * 
 * Não altera o array original
 * Sempre retorna um novo array
 */

const array = [1, 2, 3, 4, 5];

const filter = array.filter((item) => item > 3); // Filtra os numeros que são maior que 3

console.log(filter);

