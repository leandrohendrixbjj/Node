import type { ItemPedido } from "./domain/pedido.interface.ts";
import type { Pedido } from "./domain/pedido.interface.ts";
import { createMessage } from "./domain/message.ts";
import { Timestamp } from "./domain/timestamp.ts";

import { channels } from "./router/channels.ts";

import "./controller/sppliter.ts";
import "./controller/item-inventory-checker.ts";

import "./controller/inventory-computador.ts";
import "./controller/inventory-smartphone.ts";
import "./controller/item-invalido-handler.ts";

import "./controller/agregator.ts";
import "./controller/financeiro.ts";

import "./controller/validate-pedido-agregator.ts";

import "./controller/analise.ts";

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
  {
    id: 'X_002', 
    nome: 'GELADEIRA', 
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
  id: undefined,
  header: {
    DataHora: Timestamp.now('America/Sao_Paulo'),
  },
  payload: pedido  
});


// Publica MSG
channels.pedido.sendToChanel(message);
channels.pedido.sendToChanel(message);