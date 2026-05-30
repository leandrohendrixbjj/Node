import { channels } from '../router/channels.ts';
import { type Message } from '../domain/message.ts';
import { type ItemPedido } from '../domain/pedido.interface.ts';
import { waitRandomInMs } from './wait.ts';

const SISTEMA = '[INVENTARIO(S)]';

export async function checarInventario(msg: Message) {
    const itemPedido: ItemPedido = JSON.parse(msg.payload);

    console.debug(
        `${SISTEMA} - Checando inventário para o item:`,
        itemPedido.nome,
    );

    await waitRandomInMs(1000, 3000);

    console.debug(`${SISTEMA} - item ${itemPedido.nome} existe em estoque ✅`);

    // Publica MSG statusItemPedido
    channels.statusItemPedido.sendToChanel(msg);
}

channels.inventarioSmartphone.subscribe(checarInventario);