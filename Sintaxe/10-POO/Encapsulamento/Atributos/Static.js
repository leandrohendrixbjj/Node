"use strict";

/*
  static pertence à classe (User), não às instâncias.

  Cada vez que executamos new User(), um novo objeto é criado.
  Porém, a propriedade User.total continua sendo a mesma para todos os objetos,
  pois ela existe na própria classe.

  Por isso, o contador não é reiniciado a cada instância criada.
*/

console.clear()

class User {
  static total = 0;

  constructor(name) {
    this.name = name;
    User.total++;
  }

  // Concetualmente tbm usamos como metodo estático
  static getTotal() {
    return User.total;
  }
}

new User("John");
new User("Jane");

console.log(User.getTotal()); // 2