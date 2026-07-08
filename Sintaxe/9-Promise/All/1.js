"use strict";

console.clear();

/*
  Promise.all(): Recurso para executar operações assíncronas em paralelo.

  O problema que ele resolve:

  Imagine que você precisa buscar três informações diferentes em paralelo:
  - Dados do usuário
  - Lista de pedidos
  - Configurações da aplicação

  Com Promise.all(), você pode executar todas as operações em paralelo e retornar um array com os resultados.

  buscarUsuario()        ───────────────►
  buscarPedidos()        ───────────────►
  buscarConfiguracoes()  ───────────────►
  ----------------------------------------

  Essa é uma das otimizações mais simples e eficientes que podemos fazer.


  As promises terminam na order: B, A, C. Mas o resultado é A, B, C. O resultado é retornado assim que todas as 
  promises terminam.
  
  Como ele funciona internamente;
  1. Cria todas as Promises.
  2. Inicia todas imediatamente.
  3. Aguarda todas terminarem.
  4. Retorna um array com os resultados.

  Ele não executa uma por vez.
*/
function esperar(segundos, nome) {
  return new Promise(resolve => {
      setTimeout(() => {
        console.log("Executando: " + nome);
          resolve(nome);
      }, segundos * 1000);
  });
}

async function executar() {
  const resultado = await Promise.all([
      esperar(2, "A"),
      esperar(1, "B"),
      esperar(3, "C")
  ]);

  console.log(resultado);
}

executar();