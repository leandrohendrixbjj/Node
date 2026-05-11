console.clear();

/**
 * Find: Encontra o primeiro elemento do array que satisfaz a condição
 * 
 * Melhor que filter quando você só precisa de um item
 * Evita percorrer o array inteiro desnecessariamente
 */

const array = [
  {name:'Adam', age: 20},
  {name:'Anna', age: 21},
  {name:'JOE', age: 22},
  {name:'JANE', age: 23},
]

const user = array.find((item) => item.name === 'JOE'); // Encontra o usuário com o nome 'JOE'
console.log(user);
