const { body, validationResult } = require('express-validator');

const signupRules = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required'),
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

const validateSignup = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const message = errors.array()[0].msg;
    const { username, email } = req.body;

    if (req.is('application/json')) {
        return res.status(400).json({ message });
    }

    return res.status(400).render('signup', {
        errorMessage: message,
        username: username || '',
        email: email || ''
    });
};

module.exports = {
    signupRules,
    validateSignup
};
