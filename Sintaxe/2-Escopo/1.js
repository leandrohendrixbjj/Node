console.clear()

/* 
  VAR: Quando você declara uma variável com var, ela pertence à função inteira, 
  mesmo que esteja dentro de if, for ou outro bloco.

  Escopo define onde uma variável pode ser acessada no código: funções blocos ({})

  var → evitar
  
*/

function data(){  
  
  for(var row = 0; row < 5; row++){    
    console.log(row)
  }
  console.log('Vaza escopo', row)

  if (true){
    var info = 'teste'
  }
  console.log('Vaza escopo', info)
}

data()