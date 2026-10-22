const User = require('../classe/user');

exports.create_account = async (req, res) => {
    const { username, email, password } = req.body;
    const isRequestJson = req.is('application/json');

    console.log('Dados recebidos:', { username, email });

    const user = new User({ username, email, password });

    try {
        await user.createAccount();

        if (isRequestJson) {
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

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const isRequestJson = req.is('application/json');

    const user = new User({ email, password });

    try {
        // Validar o password e o email
        const validatedUser = await user.validateCredentials();

        /*
         * req.session.regenerate
             - Será encontrato COOKIE_NAME => CONNECT.SID
             - Gera uma hash que é composta por:
                - Valor fixo:s%3A
                - Id da sessão => slRWLSkWhEQIUUqqmNbGOxokkbtg6ofw ( gerado aleatoriamente e gravado no Mongo)
                - Assinatura calculada com SESSION_SECRET => Y2c%2FJq2pgtsY2L6dcD7O8jT4dIn4Znfm6zNu1KS%2BqGg         
         */
        req.session.regenerate((err) => {
            if (err) {
                return next(err);
            }

            // Grava o objeto req.session.user com username e email.
            req.session.user = {
                username: validatedUser.username,
                email: validatedUser.email
            };

            // req.session.save persiste o objeto req.session.user na coleção sessions, com o id da sessão como _id.
            req.session.save((saveErr) => {
                if (saveErr) {
                    return next(saveErr);
                }

                if (isRequestJson) {
                    return res.status(200).json({
                        message: 'Credenciais válidas',
                        user: validatedUser
                    });
                }

                return res.redirect('/members');
            });
        });
    } catch (err) {
        const status = err.statusCode || 500;
        const message = status === 500 ? 'Erro interno do servidor' : err.message;

        if (isRequestJson) {
            return res.status(status).json({ message });
        }

        res.status(status).render('index', {
            errorMessage: message,
            email: email || ''
        });
    }
};

exports.logout = (req, res, next) => {
    const isRequestJson = req.is('application/json');

    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }

        res.clearCookie('connect.sid');

        if (isRequestJson) {
            return res.status(200).json({ message: 'Sessão encerrada' });
        }

        return res.redirect('/');
    });
};
