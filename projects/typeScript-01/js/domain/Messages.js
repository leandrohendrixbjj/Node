"use strict";
exports.__esModule = true;
exports.Messages = void 0;
var Messages = /** @class */ (function () {
    function Messages() {
    }
    Messages.exibirErro = function (mensagem) {
        Messages.limparSucesso();
        var elementoErro = document.querySelector('.block-nova-transacao .mensagem-erro');
        if (!elementoErro) {
            elementoErro = document.createElement('div');
            elementoErro.className = 'mensagem-erro';
            elementoErro.setAttribute('role', 'alert');
            var formulario = document.querySelector('.block-nova-transacao form');
            if (formulario) {
                formulario.insertBefore(elementoErro, formulario.firstChild);
            }
        }
        elementoErro.textContent = mensagem;
        elementoErro.hidden = false;
    };
    Messages.limparErro = function () {
        var elementoErro = document.querySelector('.block-nova-transacao .mensagem-erro');
        if (elementoErro) {
            elementoErro.hidden = true;
            elementoErro.textContent = '';
        }
    };
    Messages.exibirSucesso = function (mensagem) {
        Messages.limparErro();
        var elementoSucesso = document.querySelector('.block-nova-transacao .mensagem-sucesso');
        if (!elementoSucesso) {
            elementoSucesso = document.createElement('div');
            elementoSucesso.className = 'mensagem-sucesso';
            elementoSucesso.setAttribute('role', 'status');
            var formulario = document.querySelector('.block-nova-transacao form');
            if (formulario) {
                formulario.insertBefore(elementoSucesso, formulario.firstChild);
            }
        }
        elementoSucesso.textContent = mensagem;
        elementoSucesso.hidden = false;
    };
    Messages.limparSucesso = function () {
        var elementoSucesso = document.querySelector('.block-nova-transacao .mensagem-sucesso');
        if (elementoSucesso) {
            elementoSucesso.hidden = true;
            elementoSucesso.textContent = '';
        }
    };
    return Messages;
}());
exports.Messages = Messages;
