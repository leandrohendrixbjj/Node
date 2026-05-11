console.clear()

// Start with: Verificar se uma URL começa com /api.

let url = "/api/users"

if (url.startsWith("/api")) {
  console.log("Rota da API")
}


// Antes de usar o startWith:
if (url.indexOf("/api") === 0) {
  console.log("Rota da API")
}