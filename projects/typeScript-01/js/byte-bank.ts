"use strict";

import {
    aplicarMascaraValor,
    aplicarDataAtual,
} from "./utils/formatarValor.js";

import { Conta } from "./domain/Conta.js";

const formulario = document.querySelector('.block-nova-transacao form') as HTMLFormElement | null;
const campoValor = document.getElementById('valor') as HTMLInputElement | null;
const campoData = document.getElementById('data') as HTMLInputElement | null;

aplicarMascaraValor(campoValor as HTMLInputElement);
aplicarDataAtual(campoData as HTMLInputElement);
Conta.exibirSaldo();

formulario?.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const tipoTransacao = (document.getElementById('tipoTransacao') as HTMLSelectElement).value;
    const valor = (document.getElementById('valor') as HTMLInputElement).value;
    const data = (document.getElementById('data') as HTMLInputElement).value;

    const conta = new Conta({ tipoTransacao, valor, data });

    if (conta.transacaoValida) {
        Conta.exibirSaldo();
        console.debug('Transação realizada com sucesso:', conta);
    } else {
        console.debug('Transação inválida:', conta);
    }
});
