"use strict"

/*
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │                           COMPOSIÇÃO (POO)  - tem um                     │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 *  A composição como o contraponto essencial à herança. Se a herança define um
 *  relacionamento de "é um" (is-a), a composição define um relacionamento de
 *  "tem um" (has-a).
 *
 *  Para Weisfeld, a composição é a chave para criar sistemas robustos e
 *  flexíveis, pois evita que você crie hierarquias profundas e rígidas que se
 *  tornam impossíveis de manter ao longo do tempo.
 *
 *  Por que Weisfeld prefere a Composição?
 *  ──────────────────────────────────────
 *  O autor argumenta que a herança é frequentemente mal utilizada, levando ao
 *  que ele chama de acoplamento forte. Quando você usa herança, a subclasse
 *  fica "amarrada" à implementação da superclasse. Se a superclasse mudar,
 *  tudo abaixo dela pode quebrar.
 *
 *  Ele não diz para abandonar a herança, mas sim para usá-la com extrema
 *  cautela. O "pensamento" orientado a objetos moderno, defendido no livro,
 *  coloca a composição como a escolha padrão para estruturar sistemas. A regra
 *  de ouro que ele reforça é: se você pode modelar seu problema usando
 *  composição, prefira a composição.
 */

console.clear();

class Motor {
  constructor(potencia) {
    this.potencia = potencia;
  }

  getPotencia() {
    return this.potencia;
  }
}

class Carro {
  constructor(modelo, motor) {
    this.modelo = modelo;
    this.motor = motor; // Aplicada a composição
  }

  getModelo() {
    return `${this.modelo} - Potência: ${this.motor.getPotencia()}`;
  }
}

const motor = new Motor(100);
const carro = new Carro('Ferrari', motor); // Aplicada a composição

console.debug(`Caro:  ${carro.getModelo()}`);