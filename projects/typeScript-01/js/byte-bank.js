const formulario = document.querySelector('.block-nova-transacao form');

Conta.exibirSaldo();

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const tipoTransacao = document.getElementById('tipoTransacao').value;
    const valor = document.getElementById('valor').value;
    const data = document.getElementById('data').value;

    const conta = new Conta({ tipoTransacao, valor, data });

    Conta.exibirSaldo();
    console.log(conta);
});
