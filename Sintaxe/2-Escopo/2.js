console.clear()

/* 
  LET: Quando você declara uma variável com let, ela pertence ao bloco onde foi declarada.   
  mesmo que esteja dentro de if, for ou outro bloco.

  let → quando precisa mudar valor  
*/

function data(){  

  try {
    if (true){
      let info = 'teste'
    }
    console.log('Vaza escopo', info)  
  } catch (error) {    
    console.log('Erro', error.stack)
  }
  
}

data()