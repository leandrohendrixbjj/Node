"use strict";
exports.__esModule = true;
exports.aplicarDataAtual = exports.aplicarMascaraValor = exports.parseValorMoeda = exports.formatarValorMoeda = void 0;
function formatarValorMoeda(valor) {
    var apenasDigitos = String(valor).replace(/\D/g, '');
    var centavos = Number(apenasDigitos || 0);
    var numero = centavos / 100;
    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
exports.formatarValorMoeda = formatarValorMoeda;
function parseValorMoeda(valorFormatado) {
    if (!valorFormatado) {
        return 0;
    }
    return Number(valorFormatado.replace(/\./g, '').replace(',', '.'));
}
exports.parseValorMoeda = parseValorMoeda;
function aplicarMascaraValor(input) {
    if (!input)
        return;
    input.addEventListener('input', function () {
        input.value = formatarValorMoeda(input.value);
    });
}
exports.aplicarMascaraValor = aplicarMascaraValor;
function aplicarDataAtual(input) {
    if (!input) {
        return;
    }
    input.valueAsDate = new Date();
}
exports.aplicarDataAtual = aplicarDataAtual;
