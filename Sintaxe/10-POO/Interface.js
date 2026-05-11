/**
 * Interface: é um conjunto de assinaturas de métodos que uma classe se compromete a implementar.
 * Em JavaScript, não existe interface, nesse caso usamos conceito de herança.
 */
class IConta {
  saque(_valor) {
    throw new Error("IConta#saque deve ser implementado pela classe concreta.");
  }

  extrato() {
    throw new Error("IConta#extrato deve ser implementado pela classe concreta.");
  }
}

class Conta extends IConta {
  constructor(titular) {
    super();
    this._titular = titular;
  }

  saque(_valor) {
    console.log("Saque");
  }

  extrato() {
    console.log("Extrato");
  }
}

// Exemplo
const conta = new Conta("Maria");
conta.saque(30);
conta.extrato();

module.exports = { IConta, Conta };
