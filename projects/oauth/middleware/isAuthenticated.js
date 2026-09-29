/*
 * RESPONSABILIDADES
 *
 * express-session
 *   Valida o cookie, busca a sessão no MongoDB e preenche req.session.
 *
 * isAuthenticated
 *   Decide se o usuário pode acessar uma rota protegida.
 *
 * FLUXO
 *
 *   connect.sid
 *        │
 *        ▼
 *   express-session
 *        │  busca a sessão no MongoDB
 *        ▼
 *   req.session
 *        │
 *        ▼
 *   isAuthenticated
 *        │  verifica req.session.user
 *        ▼
 *   rota protegida ou resposta 401/redirecionamento
 */
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }

    if (req.is('application/json')) {
        return res.status(401).json({ message: 'Não autenticado' });
    }

    return res.redirect('/');
}

module.exports = isAuthenticated;
