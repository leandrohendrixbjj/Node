class Conta {
    static saldo = 2500;

    constructor({ tipoTransacao, valor, data } = {}) {
        this.tipoTransacao = tipoTransacao;
        this.valor = valor;
        this.data = data;
        this.atualizarSaldo();
    }

    atualizarSaldo() {
        const valorNumerico = Number(this.valor);

        if (!this.tipoTransacao || !valorNumerico || valorNumerico <= 0) {
            return;
        }

        if (this.tipoTransacao === 'Depósito') {
            Conta.saldo += valorNumerico;
        } else if (
            this.tipoTransacao === 'Transferência' ||
            this.tipoTransacao === 'Pagamento de Boleto'
        ) {
            Conta.saldo -= valorNumerico;
        }
    }

    static formatarSaldo() {
        return Conta.saldo.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    static exibirSaldo() {
        const elementoSaldo = document.querySelector('.block-saldo .valor');
        elementoSaldo.textContent = Conta.formatarSaldo();
    }
}
