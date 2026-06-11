import { ItemPedido } from 'in-memory/domain/pedido.interface.ts';
import { type Message } from '../domain/message.ts';
import { channels } from '../router/channels.ts';
import chalk from 'chalk';

function itemInvalidoHandler(msg: Message) {
    const itemPedido: ItemPedido = JSON.parse(msg.payload);
    console.error(
        chalk.red.bold(
            `[DLQ] Item de pedido com id invalido recebido: ${itemPedido.id} (${itemPedido.nome})`
        )
    );
}

channels.itemInvalido.subscribe(itemInvalidoHandler);