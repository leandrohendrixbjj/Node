class Conta {
    static saldo = 2500;

    constructor({ tipoTransacao, valor, data } = {}) {
        this.tipoTransacao = tipoTransacao;
        this.valor = valor;
        this.data = data;
        this.transacaoValida = this.atualizarSaldo();
    }

    validarTransacao() {
        if (this.tipoTransacao == null || this.tipoTransacao === '') {
            return 'Selecione o tipo de transação para continuar.';
        }

        if (this.valor == null || this.valor === '') {
            return 'Informe o valor da transação.';
        }

        if (this.data == null || this.data === '') {
            return 'Informe a data da transação.';
        }

        const valorNumerico = Number(this.valor);

        if (valorNumerico <= 0) {
            return 'Informe um valor maior que zero.';
        }

        return null;
    }

    atualizarSaldo() {
        const erro = this.validarTransacao();

        if (erro) {
            Messages.exibirErro(erro);
            return false;
        }

        Messages.limparErro();

        const valorNumerico = Number(this.valor);

        if (this.tipoTransacao === 'Depósito') {
            Conta.saldo += valorNumerico;
        } else if (
            this.tipoTransacao === 'Transferência' ||
            this.tipoTransacao === 'Pagamento de Boleto'
        ) {
            Conta.saldo -= valorNumerico;
        }

        Messages.exibirSucesso('Transação realizada com sucesso!');

        return true;
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
