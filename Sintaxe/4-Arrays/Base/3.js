console.clear();

/**
 * indexOf: Retorna o índice do elemento no array.
 * 
 * Retorna o índice do primeiro elemento que satisfaz a condição
 * Se o elemento não for encontrado, retorna -1
 */ 

const arr = ['john', 'jane', 'jim', 'jill'];

const index = arr.indexOf('jane'); // 1
console.log(index);


// Retorna apenas a primeira ocorrência
const numeros = [1, 2, 3, 2];

numeros.indexOf(2); // 1