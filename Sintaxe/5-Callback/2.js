console.clear()

// Callback é uma função passada como argumento para outra função ( Exemplo básico (síncrono) )

/*
  A tradução literal de callback é "retorno de chamada".
  No contexto de programação, um callback é uma função que é passada como argumento para outra função.

  E um passo a fazer quando a função principal termina de executar. Quando prepararPizza termina de executar, 
  ele chama a função buscarPizza (que é o callback).

  Nessa operação temos um exemplo de callback síncrono.
*/

function prepararPizza(sabor, callback) {
  console.log(`Preparando pizza de ${sabor}...`);
  callback(sabor); // Nesse ponto, executamos o callback (buscarPizza)
}

function buscarPizza(sabor){
  console.log(`Pizza de ${sabor} pronta!`);
};

prepararPizza('marguerita', buscarPizza);