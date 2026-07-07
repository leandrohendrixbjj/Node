// Uma função tipada

console.clear();

function sum(a: number, b: number): number {
  return a * b;
}

console.log(sum(5, 2));


// Função sem retorno

function printHello(): void {
  console.log("Hello World");
}

printHello();


// Função com retorno ( Error )
function nomeCapitalizado(nome: string): string {
  if (!nome) {
    return "Nome não informado";
  }
  return nome.toUpperCase();
}

console.log(nomeCapitalizado('joão')); // Error: Argument of type 'string' is not assignable to parameter of type 'string | undefined'.