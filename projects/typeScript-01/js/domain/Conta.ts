"use strict";

import { parseValorMoeda } from "../utils/formatarValor.js";
import { Messages } from "./Messages.js";

class Conta {
    static saldo = 0.01;

    tipoTransacao: string;
    valor: string;
    data: string;
    transacaoValida: boolean;

    constructor({ tipoTransacao, valor, data }: { tipoTransacao: string, valor: string, data: string }) {
        this.tipoTransacao = tipoTransacao;
        this.valor = valor;
        this.data = data as string;
        this.transacaoValida = this.atualizarSaldo();
    }

    validarTransacao(): string | null {
        if (this.tipoTransacao == null || this.tipoTransacao === '') {
            return 'Selecione o tipo de transação para continuar.';
        }

        if (this.valor == null || this.valor === '') {
            return 'Informe o valor da transação.';
        }

        if (this.data == null || this.data === '') {
            return 'Informe a data da transação.';
        }

        const valorNumerico = parseValorMoeda(this.valor);

        if (valorNumerico <= 0) {
            return 'Informe um valor maior que zero.';
        }

        return null;
    }

    atualizarSaldo():boolean {
        const erro = this.validarTransacao();

        if (erro) {
            Messages.exibirErro(erro);
            return false;
        }

        Messages.limparErro();

        const valorNumerico = parseValorMoeda(this.valor);

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

    static formatarSaldo():string {
        return Conta.saldo.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    static exibirSaldo():void {
        const elementoSaldo = 
            document.querySelector('.block-saldo .valor') as HTMLElement | null;
        
        if (elementoSaldo) {
            elementoSaldo.textContent = Conta.formatarSaldo();
        }
    }
}

export { Conta };
