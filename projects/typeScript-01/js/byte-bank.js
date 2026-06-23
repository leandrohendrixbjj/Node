"use strict";
exports.__esModule = true;
var formatarValor_js_1 = require("./utils/formatarValor.js");
var Conta_js_1 = require("./domain/Conta.js");
var formulario = document.querySelector('.block-nova-transacao form');
var campoValor = document.getElementById('valor');
var campoData = document.getElementById('data');
(0, formatarValor_js_1.aplicarMascaraValor)(campoValor);
(0, formatarValor_js_1.aplicarDataAtual)(campoData);
Conta_js_1.Conta.exibirSaldo();
formulario === null || formulario === void 0 ? void 0 : formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    var tipoTransacao = document.getElementById('tipoTransacao').value;
    var valor = document.getElementById('valor').value;
    var data = document.getElementById('data').value;
    var conta = new Conta_js_1.Conta({ tipoTransacao: tipoTransacao, valor: valor, data: data });
    if (conta.transacaoValida) {
        Conta_js_1.Conta.exibirSaldo();
        console.debug('Transação realizada com sucesso:', conta);
    }
    else {
        console.debug('Transação inválida:', conta);
    }
});
