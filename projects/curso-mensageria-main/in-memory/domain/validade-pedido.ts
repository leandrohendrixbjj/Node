export interface ValidadePedido {
    idPedido: string;
    podeSerAtendido: boolean;
    tipo: 'estoque' | 'financeiro';
}