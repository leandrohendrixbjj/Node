console.clear()

// Callback é uma função passada como argumento para outra função ( Exemplo básico (síncrono) )

function welcome(name) {
  console.log('Olá, ' + name);
}

function handlerUser(callback) {
  const name = 'Leandro';
  callback(name);
}

handlerUser(welcome);
