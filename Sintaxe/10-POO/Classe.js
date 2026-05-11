console.clear();

/*
 * Classe e objeto — analogia da casa
 *
 *   Planta da casa      →  classe (define o molde)
 *   Casa construída     →  objeto / instância (o que existe de fato)
 */

class Pessoa {
  constructor(nome, idade) {
    this._nome = nome;
    this._idade = idade;
  }

  get nome() {
    return this._nome;
  }

  set nome(valor) {
    this._nome = valor;
  }

  get idade() {
    return this._idade;
  }

  set idade(valor) {
    this._idade = valor;
  }

  show() {
    console.log(`Nome: ${this._nome}, Idade: ${this._idade}`);
  }
}

// Objeto / instância
const pessoa = new Pessoa("João", 30);
pessoa.show();