"use strict";

/**
 * Factory é um padrão de projeto (Design Pattern)
 * 
 * É uma função ( criarComNome ) que retorna uma instância de uma classe.
 * 
 * Vantagens:
 *  - Facilita a criação de instâncias de uma classe.
 *  - Evita a duplicação de código.
 *  - Muito comum em APIs Node.js.
 */

console.clear();

class Usuario {
  constructor(dados) {
    this.nome = dados.nome;
  }
}

class Admin extends Usuario {
  constructor(dados) {
    super(dados);
    this.role = 'admin';
  }
}

class Cliente extends Usuario {
  constructor(dados) {
    super(dados);
    this.role = 'cliente';
  }
}

class UsuarioFactory {
  static criar(tipo, dados) {
    if (tipo === 'admin') {
      return new Admin(dados);
    }

    if (tipo === 'cliente') {
      return new Cliente(dados);
    }

    throw new Error('Tipo de usuário inválido');
  }
} 

const pessoa = UsuarioFactory.criar('admin', {nome: 'João'});
console.log(`${pessoa.nome} é um ${pessoa.role}`);

const cliente = UsuarioFactory.criar('cliente', {nome: 'Maria'});
console.log(`${cliente.nome} é um ${cliente.role}`);