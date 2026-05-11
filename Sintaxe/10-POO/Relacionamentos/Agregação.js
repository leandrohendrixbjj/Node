"use strict"

/*
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │                            AGREGAÇÃO (POO)  - faz parte de               │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 *  A agregação é uma forma específica e mais "suave" de composição. No livro,
 *  o autor descreve um relacionamento em que um objeto é construído a partir
 *  de outros objetos.
 *
 *  "Tem um" versus "faz parte de"
 *  ─────────────────────────────
 *  Se a composição clássica costuma ser vista como "tem um" (has-a), a agregação
 *  é frequentemente descrita como "faz parte de": o todo reúne partes, mas o
 *  vínculo é mais fraco do que na composição estrita.
 *
 *  Composição (forte)
 *  ──────────────────
 *  O objeto-parte não pode existir sem o objeto-todo. Se o todo deixa de
 *  existir, as partes deixam de fazer sentido naquele contexto. Exemplo: um
 *  quarto em uma casa — se a casa é demolida, aquele quarto como parte daquela
 *  casa deixa de existir.
 *
 *  Agregação (fraca)
 *  ─────────────────
 *  O objeto-parte pode existir de forma independente do objeto-todo. Ele é
 *  associado ao todo, mas não pertence exclusivamente a ele (outros agregados
 *  podem referenciá-lo ou ele sobrevive ao fim da associação).
 */

class Funcionario {
  constructor(nome, salario) {
    this.nome = nome;
    this.salario = salario;
  }

  getFuncionario() {
    return `Nome: ${this.nome}, Salario: ${this.salario}`;
  }
}

class Empresa {
  constructor(nome) {
    this.nome = nome;
    this.funcionarios = [];
  }

  adicionarFuncionario(funcionario) {
    this.funcionarios.push(funcionario);
  }

  getEmpresa() {
    return `Nome: ${this.nome},\nFuncionarios: ${this.funcionarios.map(funcionario => funcionario.getFuncionario()).join(', ')}`;
  }
}

const f1 = new Funcionario("João", 1000);
const f2 = new Funcionario("Maria", 2000);

const empresa = new Empresa("Empresa A");
empresa.adicionarFuncionario(f1);
empresa.adicionarFuncionario(f2);

console.log(empresa.getEmpresa());