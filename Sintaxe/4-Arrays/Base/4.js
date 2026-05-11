console.clear()

/**
 * O includes é o jeito mais simples e moderno de verificar se um valor existe dentro de um array.
 * 
 * true → se o valor existir
 * false → se o valor não existir
 */
const numeros = [1, 2, 3, 4, 5];

const info = numeros.includes(3);

if (info) {
  console.debug('O número 3 está no array');
} else {
  console.debug('O número 3 não está no array');
}


[1, 2, 3].includes("1"); // false
[1, 2, 3].includes(1); // true