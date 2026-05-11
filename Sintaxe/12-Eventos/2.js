"use strict";

/*
 * Quando usar?
 *
 * Use eventos quando:
 *
 *   - você quer reagir a uma ação (ex.: salvou no banco)
 *   - existem várias consequências para a mesma ação
 *   - quer evitar código acoplado e funções grandes
 *   - tudo acontece dentro do mesmo serviço/processo
 *
 * Quando não usar
 *
 * Evite eventos do Node quando:
 *
 *   - precisa comunicar entre microserviços ou containers
 *   - precisa garantir que a ação será executada (confiabilidade)
 *   - o processamento precisa ser distribuído
 *
 * Nesses casos, prefira filas (RabbitMQ, Kafka, etc.).
 */

console.clear();

const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("saveOrder", (orderId) => {
    console.log(`Saving order ${orderId}`);
});

emitter.on("saveOrder", (orderId) => {
    console.log(`Sending email to customer for order ${orderId}`);
});

emitter.emit("saveOrder", 123);