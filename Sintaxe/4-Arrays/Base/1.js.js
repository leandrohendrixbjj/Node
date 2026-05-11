console.clear();


// Arrays são estruturas de dados que armazenam vários valores em uma única variável

const array = [
  "Adam", 
  10, 
  {name: "JOE", age: 20}, 
  [1, 2, 3]
];

// Percorre o array e imprime cada elemento
for (const name of array) {
  console.log("Nome: ", name);
  console.log("--------------------------------");
}
