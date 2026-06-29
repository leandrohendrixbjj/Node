/**
 * Promise.allSettled()
 *
 * Executa operações assíncronas em paralelo e retorna um array com o
 * resultado de todas as operações, "independentemente de sucesso ou erro".
 *
 * Aguarda todas as promises terminarem antes de retornar.
 *
 * Quando usar?
 * Use quando você quer o resultado de todas as operações, mesmo que
 * algumas falhem.
 *
 * Exemplos:
 *   • Buscar vários microserviços
 *   • Enviar vários e-mails
 *   • Fazer upload de vários arquivos
 *   • Consultar diversas APIs externas
 *   • Executar tarefas independentes em paralelo
 *
 * Nesses casos, uma falha não deve impedir que as demais operações
 * sejam concluídas.
 * 
 * Quando não usar? ( Se todas as operações são obrigatórias para que o fluxo faça sentido. )
 */
"use strict";

console.clear();

const p1 = Promise.resolve("Usuário encontrado");
const p2 = Promise.reject("Notificações do usuário não encontradas");
const p3 = Promise.resolve("Pedidos do usuário encontrados");

Promise.allSettled([p1, p2, p3])
.then((results) => { 
  results.forEach(item => {
    if (item.status === "fulfilled") {
      console.log("Sucesso:", item.value);
    } else {
      console.log("Erro:", item.reason);
    }
  });
});
