console.clear();


// Arrays são estruturas de dados que armazenam vários valores em uma única variável

const array = ["Adam", "Anna"];

// Adiciona um elemento ao final do array
array.push("JOE");

// Adiciona um elemento ao início do array
array.unshift("JANE");

// Percorre o array e imprime cada elemento
for( let i = 0; i < array.length; i++) {
  console.log("Valor: ", array[i]);
  console.log("Index: ", i);
  console.log("--------------------------------");
}
