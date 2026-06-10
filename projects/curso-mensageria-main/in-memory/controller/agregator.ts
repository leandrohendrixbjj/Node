import { Timestamp } from "../domain/timestamp.ts";
import { channels } from "../router/channels.ts";
import { createMessage, type Message } from "../domain/message.ts";
import { type ItemPedido } from "../domain/pedido.interface.ts";
import { HeaderItemPedido } from "../domain/headerItemPedido.ts";
import { type ValidadePedido } from "../domain/validade-pedido.ts";

const mapaItensDoPedido = new Map<string, { total: number; atual: number }>();

const SISTEMA = '[Aggregator]';
export function aggregator(msg: Message) {
    const itemPedido: ItemPedido = JSON.parse(msg.payload);

    console.debug(
        `${SISTEMA} - Item de pedido verificado: ${itemPedido.nome}`,
    );

    const { totalItens, pedidoId } = JSON.parse(
        msg.header,
    ) as HeaderItemPedido;

    console.debug(
        `${SISTEMA} (Pedido=${pedidoId}) - Item de pedido verificado: ${itemPedido.nome}`,
    );
    
    let pedido = mapaItensDoPedido.get(pedidoId);
    if (!pedido) {
        pedido = { atual: 0, total: totalItens };
        mapaItensDoPedido.set(pedidoId, pedido);
    }
    pedido.atual++;
    if (pedido.atual >= pedido.total) {
        confirmaEstoquePedido(pedidoId);
    }
}

function confirmaEstoquePedido(idPedido: any) {
    const validadePedido: ValidadePedido = {
        idPedido,
        podeSerAtendido: true,
        tipo: 'estoque',
    }

    const mensagem = createMessage({
        header: {
          DataHora: Timestamp.now('America/Sao_Paulo'),
        },
        payload: JSON.stringify(validadePedido)        
    });    
    
    channels.estoquePedido.sendToChanel(mensagem);
}

channels.estoqueItemPedido.subscribe(aggregator);