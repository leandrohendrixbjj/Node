console.clear()

// Callback é uma função passada como argumento para outra função ( Exemplo básico (síncrono) )

/*
  A tradução literal de callback é "retorno de chamada".

  Callback é uma função passada como argumento para outra função, para que seja executada em um momento específico, 
  normalmente após a conclusão de alguma tarefa. Em operações assíncronas, o callback é executado quando a operação termina.

  Esse exemplo mostra exatamente por que callbacks são tão utilizados em operações assíncronas:

  - A função principal inicia uma tarefa demorada.
  - O JavaScript não fica bloqueado esperando.
  - Quando a tarefa termina, o callback é executado. 
  
*/

function prepararPizza(sabor, callback) {
  console.log(`Preparando pizza de ${sabor}...`);

  setTimeout(() => {
    console.log(`Pizza de ${sabor} pronta!`);
    callback(sabor); // Nesse ponto, executamos o callback (buscarPizza)
  },1000);
  
}

function buscarPizza(sabor){
  console.log(`Cliente, receba a pizza de ${sabor}!`);
};

prepararPizza('marguerita', buscarPizza);

console.log('ENquanto pizza é preparada, você pode fazer outras coisas...');