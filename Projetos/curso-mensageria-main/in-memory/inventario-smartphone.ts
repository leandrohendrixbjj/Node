import { channels } from './channels.ts';
import { type Message } from './message.ts';
import { type ItemPedido } from './pedido.interface.ts';
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
}

channels.ChecarInventarioSmartphone.subscribe(checarInventario);