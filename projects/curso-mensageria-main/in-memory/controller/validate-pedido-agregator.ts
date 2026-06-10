import { ValidadePedido } from "in-memory/domain/validade-pedido.ts";
import { channels } from "../router/channels.ts";
import { type Message } from "../domain/message.ts";

const SISTEMA = '[VALIDAR - PEDIDO - AGREGATOR]';

async function validatePedidoAgregator(message: Message) {
  const validacao: ValidadePedido = JSON.parse(message.payload);
  
  const idPedido = validacao.idPedido;  

  if (validacao.tipo === 'estoque' && validacao.podeSerAtendido) {
    console.debug(`${SISTEMA} - Pedido ${idPedido} pode ser atendido por estoque ✅`);
  } 
  
  if (validacao.tipo === 'financeiro' && validacao.podeSerAtendido) {
    console.debug(`${SISTEMA} - Pedido ${idPedido} pode ser atendido por financeiro ✅`);
  }    
  
  channels.pedidoPodeSerAtendido.sendToChanel(message); 

}

channels.estoquePedido.subscribe(validatePedidoAgregator);
channels.pendenciaFinanceiroVerificada.subscribe(validatePedidoAgregator);
