console.clear()

// CallBack inline
function handlerUser(callback) {
  const name = 'Leandro';
  callback(name);
}

handlerUser((name) => {
  console.log('Olá, ' + name);
});

