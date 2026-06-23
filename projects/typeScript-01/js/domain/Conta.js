"use strict";
exports.__esModule = true;
exports.Conta = void 0;
var formatarValor_js_1 = require("../utils/formatarValor.js");
var Messages_js_1 = require("./Messages.js");
var Conta = /** @class */ (function () {
    function Conta(_a) {
        var tipoTransacao = _a.tipoTransacao, valor = _a.valor, data = _a.data;
        this.tipoTransacao = tipoTransacao;
        this.valor = valor;
        this.data = data;
        this.transacaoValida = this.atualizarSaldo();
    }
    Conta.prototype.validarTransacao = function () {
        if (this.tipoTransacao == null || this.tipoTransacao === '') {
            return 'Selecione o tipo de transação para continuar.';
        }
        if (this.valor == null || this.valor === '') {
            return 'Informe o valor da transação.';
        }
        if (this.data == null || this.data === '') {
            return 'Informe a data da transação.';
        }
        var valorNumerico = (0, formatarValor_js_1.parseValorMoeda)(this.valor);
        if (valorNumerico <= 0) {
            return 'Informe um valor maior que zero.';
        }
        return null;
    };
    Conta.prototype.atualizarSaldo = function () {
        var erro = this.validarTransacao();
        if (erro) {
            Messages_js_1.Messages.exibirErro(erro);
            return false;
        }
        Messages_js_1.Messages.limparErro();
        var valorNumerico = (0, formatarValor_js_1.parseValorMoeda)(this.valor);
        if (this.tipoTransacao === 'Depósito') {
            Conta.saldo += valorNumerico;
        }
        else if (this.tipoTransacao === 'Transferência' ||
            this.tipoTransacao === 'Pagamento de Boleto') {
            Conta.saldo -= valorNumerico;
        }
        Messages_js_1.Messages.exibirSucesso('Transação realizada com sucesso!');
        return true;
    };
    Conta.formatarSaldo = function () {
        return Conta.saldo.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };
    Conta.exibirSaldo = function () {
        var elementoSaldo = document.querySelector('.block-saldo .valor');
        if (elementoSaldo) {
            elementoSaldo.textContent = Conta.formatarSaldo();
        }
    };
    Conta.saldo = 0.01;
    return Conta;
}());
exports.Conta = Conta;
