"use strict";

/**
 * Sobrecarga de construtor em JavaScript
 * 
 * Sobrecarga de construtor é a capacidade de um construtor de uma classe ter mais de uma assinatura.
 * 
 * * Diferente de Java, C# ou TypeScript (em tempo de compilação), JavaScript permite apenas um construtor por classe.
 * 
 * Então podemos usar o padrão para "sobrecarregar" o construtor em JavaScript.
 * 
 * Exemplo:
 *  - new Pessoa('João');
 *  - new Pessoa('João', 20);
 *  - new Pessoa('João', 20, 'Rua das Flores'); 
 */

console.clear();

class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    
    if (idade) {
      this.idade = idade;
    }
  }
}

const p1 = new Pessoa('João');
console.log(p1.nome);

const p2 = new Pessoa('Maria', 20);
console.log(p2.nome);
console.log(p2.idade);