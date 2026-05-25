import type { ItemPedido } from "./pedido.interface";
import type { Pedido } from "./pedido.interface";
import { createMessage } from "./message";
import { channels } from "./channels";
import { Timestamp } from "./timestamp";
import "./sppliter.ts";
import "./router.ts";
import './inventario-computador.ts';
import './inventario-smartphone.ts';

const itens: ItemPedido[] = [ 
  {
    id: 'C_001', 
    nome: 'COMPUTADOR', 
    quantidade: 1, 
    precoUnitario: 100, 
  },  
  {
    id: 'S_002', 
    nome: 'SMARTTV', 
    quantidade: 2, 
    precoUnitario: 50 
  },
];


const pedido: Pedido = { 
  id: 'S_001', 
  idCliente: 'C_001',
  itens: itens,  
};

const message = createMessage({  
  payload: pedido,
  header: {
    DataHora: Timestamp.now('America/Sao_Paulo'),
  },
});


// Esculta Msg Canal Novo Pedido
// channels.novoPedido.subscribe((message) => {
//   console.debug("Esculta msg Canal [Novo_Pedido]", JSON.parse(message.payload))
// })


// Publica MSG
channels.novoPedido.sendToChanel(message);




