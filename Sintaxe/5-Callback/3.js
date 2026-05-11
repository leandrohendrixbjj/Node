console.clear()

/* 
  Callback assíncrono (onde realmente importa)
    Saida: Start, End, Executou depois

  setTimeout registra um callback. O event loop executa depois  
*/  
console.log('Start');

setTimeout(() => {
    console.log('Executou depois');
}, 1000);

console.log('End');
