const User = require('../classe/user');

exports.create_account = async (req, res) => {
    const { username, email, password } = req.body;

    console.log('Dados recebidos:', { username, email, password });

    const user = new User({ username, email, password });

    try {
        await user.createAccount();

        if (req.is('application/json')) {
            return res.status(201).json({
                message: 'Conta criada com sucesso',
                user: { username, email }
            });
        }

        res.redirect('/');
    } catch (err) {
        const status = err.statusCode || 500;
        const message = status === 500 ? 'Erro interno do servidor' : err.message;

        if (req.is('application/json')) {
            return res.status(status).json({ message });
        }

        res.status(status).render('signup', {
            errorMessage: message,
            username: username || '',
            email: email || ''
        });
    }
};
