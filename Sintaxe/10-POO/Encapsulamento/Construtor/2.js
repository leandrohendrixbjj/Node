"use strict";

/**
 * Objeto de configuração (padrão muito usado em Node.js)
 * 
 * É uma forma de passar parâmetros para um construtor de uma classe de forma mais limpa e organizada.
 * 
 * Pode ser considerado uma forma de "sobrecarga" de construtor em JavaScript.
 * 
 * Sobrecarga de construtor é a capacidade de um construtor de uma classe ter mais de uma assinatura.
 * 
 * Vantagens:
 *  - Facilita adicionar novos campos.
 *  - Evita problemas com ordem dos parâmetros.
 *  - Muito comum em APIs Node.js.
 */

console.clear();

class Usuario {
  constructor({ nome, email, idade }) {
    this.nome = nome;
    this.email = email;
    this.idade = idade;
  }
}

const usuario = new Usuario({
  nome: "Leandro",
  email: "teste@email.com",
  idade: 35
});