class Cliente {
  
  constructor(nome,cpf){
    this._nome = nome;
    this._cpf = cpf;
  }

  getName(){
    return this._nome;
  }  

  getCpf() {
    return this._cpf;
  }

  getCliente() {
    return `Nome: ${this._nome} | AG: ${this._cpf}`
  }
}

module.exports = Cliente;


