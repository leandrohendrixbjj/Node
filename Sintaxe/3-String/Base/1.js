console.clear()

// Strings são imutáveis em javascript
let data = 'node'
data[0] = 'j'

console.log(data) // node

// Não altera a string original, V8 cria uma nova string em memória
data += 'js'

console.log(data) // nodejs

/* 
  ============================================================
  data ─────► "node"
  "node"   (pode continuar na memória ou ser coletada pelo GC)
  data ─────► "nodejs"
  ============================================================ 
*/



