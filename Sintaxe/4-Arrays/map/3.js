console.clear();

// Retorna um novo array com os valores transformados ( Usuários com status de maior de idade )

const usuarios = [
  { nome: "Ana", idade: 20 },
  { nome: "Carlos", idade: 30 },
  { nome: "João", idade: 15 },
];

const userStaus = usuarios.map(user => {
  return {
    ...user,
    maiorDeIdade: user.idade >= 18
  };
});

console.log(userStaus);