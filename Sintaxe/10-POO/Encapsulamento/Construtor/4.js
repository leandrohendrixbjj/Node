"use strict";

/**
 * Factory
 * 
 * É uma função que retorna uma instância de uma classe.
 * 
 * Vantagens:
 *  - Facilita a criação de instâncias de uma classe.
 *  - Evita a duplicação de código.
 *  - Muito comum em APIs Node.js.
 */

console.clear();

class Pessoa {
  constructor({nome, idade, perfil}) {
    this.nome = nome;
    this.idade = idade;
    this.perfil = perfil;
  }

  static criarComNome({nome}) {
    return new Pessoa({nome, idade: null, perfil: 'user'});
  }

  static criarCompleta({nome, idade, perfil}) {
    return new Pessoa({nome, idade, perfil});
  }
}

const pessoa = Pessoa.criarComNome({nome: 'João'});
console.log(pessoa.nome);
console.log(pessoa.perfil);

const pessoa2 = Pessoa.criarCompleta({nome: 'Maria', idade: 20, perfil: 'user'});
console.log(pessoa2.nome);
console.log(pessoa2.idade);
console.log(pessoa2.perfil);

const pessoa3 = Pessoa.criarCompleta({nome: 'Jonas', idade: 30, perfil: 'admin'});
console.log(pessoa3.nome);
console.log(pessoa3.idade);
console.log(pessoa3.perfil);