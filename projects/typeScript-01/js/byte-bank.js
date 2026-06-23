"use strict";

const formulario = document.querySelector('.block-nova-transacao form');
const campoValor = document.getElementById('valor');
const campoData = document.getElementById('data');

aplicarMascaraValor(campoValor);
aplicarDataAtual(campoData);
Conta.exibirSaldo();

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const tipoTransacao = document.getElementById('tipoTransacao').value;
    const valor = document.getElementById('valor').value;
    const data = document.getElementById('data').value;

    const conta = new Conta({ tipoTransacao, valor, data });

    if (conta.transacaoValida) {
        Conta.exibirSaldo();
        console.debug('Transação realizada com sucesso:', conta);
    } else {
        console.debug('Transação inválida:', conta);
    }
});
