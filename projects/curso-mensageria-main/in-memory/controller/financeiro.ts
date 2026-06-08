import { channels } from '../router/channels.ts';
import { createMessage, type Message } from '../domain/message.ts';
import { type Pedido } from '../domain/pedido.interface.ts';
import { waitRandomInMs } from './wait.ts';
import { type ValidadePedido } from '../domain/validade-pedido.ts';
import { Timestamp } from 'in-memory/domain/timestamp.ts';

const SISTEMA = '[FINANCEIRO]';

export async function financeiro(msg: Message) {
    const novoPedido: Pedido = JSON.parse(msg.payload);

    console.debug(
      `${SISTEMA} Analisando pendencias para cliente ${novoPedido.idCliente}`,
  );

    await waitRandomInMs(1000, 3000);

    console.debug(
      `${SISTEMA} Cliente ${novoPedido.idCliente} não possui pendências`,
    );

    const statusPedido: ValidadePedido = {
      idPedido: novoPedido.id,
      podeSerAtendido: true,
      tipo: 'financeiro',
    };

    const mensagem = createMessage({
      payload: statusPedido,   
      header: {
        DataHora: Timestamp.now('America/Sao_Paulo'),
      }      
    });

    // Publica MSG statusItemPedido
    channels.pendenciaFinanceiroVerificada.sendToChanel(mensagem);
}

channels.pedido.subscribe(financeiro);