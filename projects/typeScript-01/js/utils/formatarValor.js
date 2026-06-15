"use strict";

function formatarValorMoeda(valor) {
    const apenasDigitos = String(valor).replace(/\D/g, '');
    const centavos = Number(apenasDigitos || 0);
    const numero = centavos / 100;

    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function parseValorMoeda(valorFormatado) {
    if (!valorFormatado) {
        return 0;
    }

    return Number(valorFormatado.replace(/\./g, '').replace(',', '.'));
}

function aplicarMascaraValor(input) {
    input.addEventListener('input', () => {
        input.value = formatarValorMoeda(input.value);
    });
}
