import { Timestamp } from "../domain/timestamp.ts";
import { channels } from "../router/channels.ts";
import { createMessage, type Message } from "../domain/message.ts";
import { type ItemPedido } from "../domain/pedido.interface.ts";
import { HeaderItemPedido } from "../domain/headerItemPedido.ts";
import { type StatusPedido } from "../domain/status-pedido.ts";

const mapaItensDoPedido = new Map<string, { total: number; atual: number }>();

const SISTEMA = '[Aggregator]';
export function aggregator(msg: Message) {
    const itemPedido: ItemPedido = JSON.parse(msg.payload);

    const { totalItens, pedidoId } = JSON.parse(
        msg.header,
    ) as HeaderItemPedido;

    console.debug(
        `${SISTEMA} (Pedido=${pedidoId}) - Item de pedido verificado: ${itemPedido.nome}`,
    );
    
    const pedido = mapaItensDoPedido.get(pedidoId) ?? { atual: 0, total: totalItens };
    if (pedido) {
        pedido.atual++;
        if (pedido.atual >= pedido.total) {
            confirmaStatusPedido(pedidoId);
        }
    } else {
        mapaItensDoPedido.set(pedidoId, {
            atual: 1,
            total: totalItens,
        });
    }
}

function confirmaStatusPedido(idPedido: any) {
    const statusPedido: StatusPedido = {
        idPedido,
        podeSerAtendido: true,
    }

    const mensagem = createMessage({
        header: {
          DataHora: Timestamp.now('America/Sao_Paulo'),
        },
        payload: JSON.stringify(statusPedido),
    });    
    
    channels.statusPedido.sendToChanel(mensagem);
}

channels.statusItemPedido.subscribe(aggregator);