class Messages {
    static exibirErro(mensagem) {
        Messages.limparSucesso();

        let elementoErro = document.querySelector('.block-nova-transacao .mensagem-erro');

        if (!elementoErro) {
            elementoErro = document.createElement('div');
            elementoErro.className = 'mensagem-erro';
            elementoErro.setAttribute('role', 'alert');

            const formulario = document.querySelector('.block-nova-transacao form');
            formulario.insertBefore(elementoErro, formulario.firstChild);
        }

        elementoErro.textContent = mensagem;
        elementoErro.hidden = false;
    }

    static limparErro() {
        const elementoErro = document.querySelector('.block-nova-transacao .mensagem-erro');

        if (elementoErro) {
            elementoErro.hidden = true;
            elementoErro.textContent = '';
        }
    }

    static exibirSucesso(mensagem) {
        Messages.limparErro();

        let elementoSucesso = document.querySelector('.block-nova-transacao .mensagem-sucesso');

        if (!elementoSucesso) {
            elementoSucesso = document.createElement('div');
            elementoSucesso.className = 'mensagem-sucesso';
            elementoSucesso.setAttribute('role', 'status');

            const formulario = document.querySelector('.block-nova-transacao form');
            formulario.insertBefore(elementoSucesso, formulario.firstChild);
        }

        elementoSucesso.textContent = mensagem;
        elementoSucesso.hidden = false;
    }

    static limparSucesso() {
        const elementoSucesso = document.querySelector('.block-nova-transacao .mensagem-sucesso');

        if (elementoSucesso) {
            elementoSucesso.hidden = true;
            elementoSucesso.textContent = '';
        }
    }
}
