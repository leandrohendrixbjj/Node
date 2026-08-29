const { body, validationResult } = require('express-validator');

const loginRules = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is invalid'),
    body('password')
        .isString()
        .withMessage('Password is incorrect')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Password is required')
];

const validateLogin = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const message = errors.array()[0].msg;
    const { email } = req.body;

    if (req.is('application/json')) {
        return res.status(400).json({ message });
    }

    return res.status(400).render('index', {
        errorMessage: message,
        email: email || ''
    });
};

module.exports = {
    loginRules,
    validateLogin
};
