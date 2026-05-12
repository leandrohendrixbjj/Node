"use strict";

/*
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │                           POLIMORFISMO (POO)                             │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 *  Herança e composição dizem como as classes se ligam (a estrutura). O
 *  polimorfismo diz como elas se comportam quando convivem: a mesma chamada de
 *  método pode executar lógicas diferentes, conforme o tipo real do objeto.
 *
 *  Ideia central
 *  ─────────────
 *  Diferentes classes respondem ao mesmo método de maneiras distintas; quem
 *  usa o objeto depende só da “forma” comum (superclasse ou contrato), não da
 *  implementação concreta.
 *
 *  Benefícios do polimorfismo
 *  ──────────────────────────
 *    • Código mais flexível
 *    • Facilita manutenção
 *    • Facilita extensão
 *    • Evita muitos if/else
 *    • Deixa o sistema mais desacoplado
 */

console.clear()

class CanalNotificacao {
  enviar(mensagem) {
    throw new Error('CanalNotificacao#enviar deve ser implementado.')
  }
}

class Email extends CanalNotificacao {
  enviar(mensagem) {
    return `[E-mail] ${mensagem}`
  }
}

class Whatsapp extends CanalNotificacao {
  enviar(mensagem) {
    return `[Whatsapp] ${mensagem}`
  }
}

class SMS extends CanalNotificacao {
  enviar(mensagem) {
    return `[SMS] ${mensagem}`
  }
}

/** O mesmo código funciona para qualquer canal: só importa que `enviar` exista. */
function notificar(canal, texto) {
  console.log(canal.enviar(texto))
}

notificar(new Email(), 'Sua conta foi atualizada.')
notificar(new Whatsapp(), 'Sua conta foi atualizada.')
notificar(new SMS(), 'Sua conta foi atualizada.')
