class Messages {
    static exibirErro(mensagem: string): void {
        Messages.limparSucesso();

        let elementoErro = 
            document.querySelector('.block-nova-transacao .mensagem-erro') as HTMLElement | null;

        if (!elementoErro) {
            elementoErro = document.createElement('div');
            elementoErro.className = 'mensagem-erro';
            elementoErro.setAttribute('role', 'alert');

            const formulario = 
                document.querySelector('.block-nova-transacao form') as HTMLFormElement | null;

            if (formulario) {
                formulario.insertBefore(elementoErro, formulario.firstChild);
            }
        }

        elementoErro.textContent = mensagem;
        elementoErro.hidden = false;
    }

    static limparErro(): void {
        const elementoErro = 
            document.querySelector('.block-nova-transacao .mensagem-erro') as HTMLElement | null;

        if (elementoErro) {
            elementoErro.hidden = true;
            elementoErro.textContent = '';
        }
    }

    static exibirSucesso(mensagem: string): void {
        Messages.limparErro();

        let elementoSucesso = 
            document.querySelector('.block-nova-transacao .mensagem-sucesso') as HTMLElement | null;

        if (!elementoSucesso) {
            elementoSucesso = document.createElement('div');
            elementoSucesso.className = 'mensagem-sucesso';
            elementoSucesso.setAttribute('role', 'status');

            const formulario =  
                document.querySelector('.block-nova-transacao form') as HTMLFormElement | null;

            if (formulario) {
                formulario.insertBefore(elementoSucesso, formulario.firstChild);
            }
        }

        elementoSucesso.textContent = mensagem;
        elementoSucesso.hidden = false;
    }

    static limparSucesso(): void {
        const elementoSucesso = 
            document.querySelector('.block-nova-transacao .mensagem-sucesso') as HTMLElement | null;

        if (elementoSucesso) {
            elementoSucesso.hidden = true;
            elementoSucesso.textContent = '';
        }
    }
}
