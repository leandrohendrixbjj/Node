console.clear()

//Symbol é um tipo primitivo usado para criar identificadores únicos, geralmente como chaves de propriedades.

const symbol = Symbol("");
const symbol2 = Symbol("");

// Mesmo sem descrição, cada Symbol é único.
console.log(symbol === symbol2); // false

const ID = Symbol("123");

ID.description = "789"; // Não é possível alterar a descrição de um Symbol.

const user = {
  id: ID.description, 
  [ID]: "123",
  name: "John",
  age: 30,
}

console.log(user);