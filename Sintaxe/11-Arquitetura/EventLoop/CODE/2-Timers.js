console.log('1. Antes do setTimeout');

setTimeout(() => {
  console.log('2. Callback do timer (200ms)');
}, 200);

console.log('3. Depois do setTimeout');

// Código síncrono pesado (simulado)
let sum = 0;
for (let i = 0; i < 1e8; i++) {
  sum += i;
}

console.log('4. Após o loop pesado');