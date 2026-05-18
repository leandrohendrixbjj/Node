console.clear()

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
class ContaBancaria {
  constructor(cliente, saldo = 0) {
    this._saldo = saldo
    this._cliente = cliente
    this._movimentos = []
    /** @type {number} 0 = sem acréscimo; subclasses usam multiplicador (ex.: 1.01) */
    this.taxaRetorno = 0
  }

  registrarMovimento(tipo, valor) {
    this._movimentos.push({
      tipo,
      valor,
      cliente: 'Cliente: ' + this._cliente,
    })
  }

  depositar(valor) {
    if (valor <= 0) return
    const fator = this.taxaRetorno === 0 ? 1 : this.taxaRetorno
    const credito = valor * fator
    this._saldo += credito
    this.registrarMovimento('DEPÓSITO', credito)
  }

  verExtrato() {
    if (this._movimentos.length === 0) {
      return 'Nenhuma movimentação registrada.'
    }
    return this._movimentos
      .map(
        (data) =>
          `${data.tipo}: R$ ${data.valor.toFixed(2)} - ${data.cliente}`
      )
      .join('\n')
  }  
}

class Poupanca extends ContaBancaria {
  constructor(cliente, saldo = 0) {
    super(cliente, saldo)
    this.taxaRetorno = 1.01
  }
}

class Investimento extends ContaBancaria {
  constructor(cliente, saldo = 0) {
    super(cliente, saldo)
    this.taxaRetorno = 1.02
  }
}

// Exemplo de uso
const poup = new Poupanca('João')
poup.depositar(1000)
console.log(poup.verExtrato())

const inv = new Investimento('Maria')
inv.depositar(1000)
console.log(inv.verExtrato())

const conta = new ContaBancaria('Pedro')
conta.depositar(1000)
console.log(conta.verExtrato())

