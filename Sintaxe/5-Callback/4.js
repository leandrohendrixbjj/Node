console.clear()

// Exemplo clássico com callback customizado
console.log('Start');

function buscarDados(callback) {
  setTimeout(() => {
      const dados = { id: 1, nome: 'Leandro' };
      callback(dados);
  }, 1000);
}

buscarDados((dados) => {
  console.log('Recebi:', dados);
});

console.log('End');