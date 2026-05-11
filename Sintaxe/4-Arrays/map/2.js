console.clear();

// Valores retornados pelo map são adicionados a um novo array

const data = ['leandro', 'joe', 'jane'];

data.map((item, index, arrayOriginal) => {
  console.log("Index: ", index);
  console.log("Item: ", item);
  console.log("Array Original: ", arrayOriginal);
  console.log("--------------------------------");
});