console.clear()

// Performance de concatenação de strings

// custoso porque cria várias strings novas.
let data = ""

for(let row = 0; row < 5; row++) {
  data += row
}
console.log("Concatenação de strings: ", data)

// mais performatico porque cria um array e depois junta as strings com o join
const arr = []
for(let row = 0; row < 5; row++) {
  arr.push(row)
}

data = arr.join('') // Transformando o array em uma string
console.log("Array.join: ", data)