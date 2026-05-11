const Cliente = require('./Cliente.js')

class ContaCorrente {  
  constructor(agencia, conta, cliente) {
    this.agencia = agencia;
    this.conta = conta;
    this._saldo = 0; // _ indica convenção de atributo privado
    this._cliente = cliente;

  }

  depositar(valor) {
    this._saldo += valor;
  }

  sacar(valor) {
    if (valor > this._saldo) {
      throw new Error("Saldo insuficiente para realizar o saque.");
    }
    this._saldo -= valor;
  }  

  cliente() {
    return this._cliente
  }
}

const cliente = new Cliente('Leandro',"225"); 

const contaCorrente = new ContaCorrente("0001", "12345-6", cliente);
contaCorrente.depositar(500);
contaCorrente.sacar(100);
console.log(contaCorrente._cliente);