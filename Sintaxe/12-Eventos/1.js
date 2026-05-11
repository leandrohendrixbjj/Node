"use strict";

/*
 * O que são eventos?
 *
 * Um evento é um sinal de que alguma ação ocorreu. No Node.js, usamos a classe
 * EventEmitter para:
 *
 *   - emitir um evento
 *   - escutar um evento
 *
 * Eventos ajudam a desacoplar o código — evitando que tudo fique concentrado
 * em uma única função.
 *
 * Exemplo prático
 *
 * Ao salvar um usuário no banco, você pode precisar também de:
 *
 *   - atualizar o cache
 *   - gerar log
 *   - notificar outro sistema
 */

console.clear();

const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("salvar", () => {
    console.log("Dados salvos!");
});

emitter.emit("salvar");