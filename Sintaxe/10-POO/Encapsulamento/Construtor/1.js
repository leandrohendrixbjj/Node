"use strict";

/**
 * Construtor de classe em JavaScript
 *
 * Responsabilidade do construtor: inicializar os atributos nnecessários para o funcionamento da classe.
 * 
 * Devemos evitar que ele faça:
 *  -Fazer processamento pesado.
 *  -Fazer validações.
 *  -Fazer chamadas a API.
 *  -Fazer chamadas a banco de dados.
 *  -Fazer chamadas a arquivos.
 *  
 */

console.clear();

class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }
}

const pessoa = new Pessoa('João', 30);
console.log(pessoa.nome);
console.log(pessoa.idade);