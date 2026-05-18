"use strict";

/*
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │                           ENCAPSULAMENTO (POO)                          │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 *  O encapsulamento é um dos pilares da POO. Ele define como restringir o acesso direto aos dados internos de um objeto, 
 *  permitindo interação apenas através de uma interface controlada.
 *
 *  Ideia central
 *  ─────────────
 *  Restringir o acesso direto aos dados internos de um objeto, permitindo interação apenas através de uma interface controlada.
 *
 *  Benefícios do encapsulamento
 *  ──────────────────────────
 *    • Proteção de dados
 *    • Facilita manutenção
 *    • Facilita extensão
 *    • Evita muitos if/else
 *    • Deixa o sistema mais desacoplado
 */

console.clear();

class Conta {
  #saldo = 0;

  depositar(valor) {
    if (valor <= 0) {
      throw new Error("Valor inválido");
    }

    this.#saldo += valor;
  }

  getSaldo() {
    return this.#saldo;
  }
}

const conta = new Conta();

conta.depositar(100);

console.log(conta.getSaldo());