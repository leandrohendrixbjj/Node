console.clear()

/*
  No Node.js, cada arquivo é um módulo. Ou seja:

  - Todo arquivo .js é automaticamente encapsulado como um módulo.
  - Variáveis não vazam para outros arquivos
  - Funções não ficam globais
  - Você precisa usar module.exports ou export para compartilhar algo
*/

const sayHi = require('./util.js')
const { john, sarah } = require('./names.js')

sayHi(john)
sayHi(sarah)