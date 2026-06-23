"use strict";
function formatarValorMoeda(valor) {
    var apenasDigitos = String(valor).replace(/\D/g, '');
    var centavos = Number(apenasDigitos || 0);
    var numero = centavos / 100;
    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function parseValorMoeda(valorFormatado) {
    if (!valorFormatado) {
        return 0;
    }
    return Number(valorFormatado.replace(/\./g, '').replace(',', '.'));
}
function aplicarMascaraValor(input) {
    if (!input)
        return;
    input.addEventListener('input', function () {
        input.value = formatarValorMoeda(input.value);
    });
}
