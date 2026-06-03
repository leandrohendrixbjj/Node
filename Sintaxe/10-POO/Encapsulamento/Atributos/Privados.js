"use strict";

/**
 * Campos de classe em JavaScript
 *
 * #nome  — campo privado (só acessível dentro da classe; fora dela dá erro de sintaxe).
 * _nome  — convenção de “uso interno”; ainda é público, mas sinaliza que não deve ser
 *          usado diretamente por quem consome a API.
 */

console.clear();

class Server {
  #port = 3000; // private property
  _dns = '127.0.0.1';

  getPort() {
    return this.#port;
  }

  getDns() {
    return this._dns;
  }
}

const server = new Server();

server.port = 3001;
server._dns = '127.0.0.2';

console.log('Port:', server.getPort());
console.log('DNS:', server.getDns());