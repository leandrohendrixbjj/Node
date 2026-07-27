"use strict";

/*
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │                           ABSTRAÇÃO (POO)                                │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 *  A abstração é um dos pilares da POO: esconder a complexidade e expor só o
 *  que é relevante para quem usa o objeto.
 *
 *  Na prática
 *  ───────────
 *  Você mostra “o que o objeto faz”, não “como ele faz” por dentro.
 *
 *  O que a abstração resolve
 *  ─────────────────────────
 *    1. Reduz complexidade
 *       Dá para usar algo sem dominar todos os detalhes internos.
 *
 *    2. Facilita manutenção
 *       A lógica interna pode mudar sem quebrar quem depende só da interface
 *       pública.
 *
 *  Abstração e encapsulamento
 *  ───────────────────────────
 *  Costumam andar juntos: o encapsulamento protege dados e controla o acesso; a
 *  abstração esconde o “como” e deixa visível o essencial (o “o quê”).
 */

console.clear();

class EmailService {
  #conectarSMTP() {
    console.log("Conectando no servidor SMTP...");
  }

  #autenticar() {
    console.log("Autenticando...");
  }

  #montarMensagem() {
    console.log("Montando email...");
  }

  // Toda a complexidade ficou escondida.
  enviarEmail() {
    this.#conectarSMTP();
    this.#autenticar();
    this.#montarMensagem();

    console.log("Email enviado com sucesso!");
  }
}

const email = new EmailService();

email.enviarEmail();