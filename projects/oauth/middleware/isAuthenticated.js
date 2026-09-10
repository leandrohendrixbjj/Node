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
