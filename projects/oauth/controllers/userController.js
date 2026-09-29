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
        const validatedUser = await user.validateCredentials();

        /*
         * CONNECT.SID
         *
         * req.session.regenerate gera um id aleatório.
         * Exemplo: U4nYs10k6KPkBtU6ZsMtBPadACKPRTI
         *
         * O cookie connect.sid guarda esse id junto com uma assinatura.
         * No Chrome o valor aparece codificado:
         *
         *   s%3AslRWLSkWhEQIUUqqmNbGOxokkbtg6ofw.Y2c%2FJq2pgtsY2L6dcD7O8jT4dIn4Znfm6zNu1KS%2BqGg
         *
         * Partes:
         *   s%3A
         *     Prefixo fixo. Decodificado, é "s:".
         *
         *   slRWLSkWhEQIUUqqmNbGOxokkbtg6ofw
         *     Id da sessão. É aleatório e é o _id gravado no Mongo.
         *
         *   Y2c%2FJq2pgtsY2L6dcD7O8jT4dIn4Znfm6zNu1KS%2BqGg
         *     Assinatura desse id, calculada com SESSION_SECRET.
         */
        req.session.regenerate((err) => {
            if (err) {
                return next(err);
            }
            // 2. Grava req.session.user com username e email.
            req.session.user = {
                username: validatedUser.username,
                email: validatedUser.email
            };

            // req.session.save persiste esse objeto na coleção sessions, com esse id como _id.
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
