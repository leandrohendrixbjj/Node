"use strict";

/**
 * Herança e super()
 * 
 * Quando uma classe herda outra:
 *  - O super() deve ser chamado antes de acessar this. 
 */

console.clear();

class Pessoa {
  constructor(nome) {
    this.nome = nome;
  }
}

class Funcionario extends Pessoa {
  constructor(nome, cargo) {
    super(nome);
    this.cargo = cargo;
  }
}

const funcionario = new Funcionario('João', 'Desenvolvedor');
console.log(funcionario.nome);
console.log(funcionario.cargo);