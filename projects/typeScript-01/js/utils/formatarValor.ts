"use strict";

function formatarValorMoeda(valor: string): string {
    const apenasDigitos = String(valor).replace(/\D/g, '');
    const centavos = Number(apenasDigitos || 0);
    const numero = centavos / 100;

    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function parseValorMoeda(valorFormatado?: string): number {
    if (!valorFormatado) {
        return 0;
    }

    return Number(valorFormatado.replace(/\./g, '').replace(',', '.'));
}

function aplicarMascaraValor(input: HTMLInputElement): void {
    if (!input) return;
    input.addEventListener('input', () => {
        input.value = formatarValorMoeda(input.value as string);
    });
}

function aplicarDataAtual(input?: HTMLInputElement): void {
    if (!input) {
        return;
    }
    input.valueAsDate = new Date();
}


export { formatarValorMoeda, parseValorMoeda, aplicarMascaraValor, aplicarDataAtual };