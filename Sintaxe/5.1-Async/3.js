"use strict";

/*
  * Resumindo:

  * async não significa que existe um await.
  * async não torna automaticamente o código assíncrono.
  * async faz a função retornar uma Promise.
  * await é o que suspende a execução da função até a Promise ser resolvida.
  * Tudo continua rodando na mesma thread do Node, a menos que você use APIs que deleguem trabalho para o sistema operacional, 
  * libuv ou Worker Threads.
*/

console.clear();

// Código assíncrono com await
async function teste() {
  console.log('B');
  
  // await diz: Pause esta função aqui e continue quando essa Promise for resolvida.
  await Promise.resolve()
  .then(() => {
    console.log('C');
  });  
}

console.log('A');
teste();
console.log('D');