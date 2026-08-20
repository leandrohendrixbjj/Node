"use strict"

/*
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │                            HERANÇA (POO) - é um                          │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 *  A herança é um dos conceitos mais poderosos (e por vezes mal interpretados)
 *  da OO. Segundo Matt Weisfeld, ela permite que uma classe herde atributos e
 *  comportamentos de outra, estabelecendo a relação fundamental de "é um".
 *
 *  Estrutura
 *  ─────────
 *    Superclasse (classe pai)
 *      Classe mais genérica: concentra atributos e métodos comuns ao grupo.
 *
 *    Subclasse (classe filha)
 *      Classe mais específica: herda da superclasse e pode acrescentar ou
 *      modificar comportamentos.
 *
 *  Acoplamento forte
 *  ─────────────────
 *  A herança cria vínculo forte entre pai e filhos: alterar a superclasse pode
 *  quebrar subclasses sem intenção. Por isso, no OO moderno costuma-se dizer:
 *  "Prefira composição à herança." Use herança quando a relação "é um" for
 *  clara, verdadeira e estável.
 */

console.clear()

class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }

  getAtributos() {
    return `Nome: ${this.nome} - Idade: ${this.idade}`;
  }
}

// Usuario "é uma" Pessoa (herança)
class Usuario extends Pessoa {
  constructor(nome, idade, email) {
    super(nome, idade);
    this.email = email;
  }

  getAtributos() {
    return `${super.getAtributos()} - Email: ${this.email}`;
  }
}

const usuario = new Usuario("Hendrix", 30, "hendrix@email.com");
console.log(usuario.getAtributos());
