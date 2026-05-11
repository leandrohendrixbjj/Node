console.clear()

/*
  const → padrão
  let → quando precisa mudar valor
  var → evitar
*/

// CONST: Quando você declara uma variável com const, ela não pode ser alterada.   
const data = 'John Doe'

try {
  data = 'Jane Doe'  
} catch (error) {
  console.log('Erro', error.stack)
}


// CONST: Não vaza o escopo.
function info(){
  if (true){
    const age = 30
  }
  console.log('Data', age)
}

try {
  info()  
} catch (error) {
  console.log('Erro', error.stack)
}


// Permite alteração porque você mudou a propriedade, não a variável.
const person = {
  name: 'John Doe',
  age: 30,
  city: 'New York'
}

person.name = 'Ana'

console.log('Person', person)