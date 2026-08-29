const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const AppError = require('../errors/AppError');

class User {
    constructor({ username, email, password }) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    async validate() {
        const existingUser = await UserModel.findByEmail(this.email.trim().toLowerCase());
        if (existingUser) {
            throw new AppError('Email already in use', 409);
        }
    }

    sanitize() {
        this.username = this.username.trim().toLowerCase();
        this.email = this.email.trim().toLowerCase();
    }

    async createAccount() {
        await this.validate();
        this.sanitize();

        const hashedPassword = await bcrypt.hash(this.password, 12);

        return UserModel.create({
            username: this.username,
            email: this.email,
            password: hashedPassword
        });
    }

    async validateCredentials() {
        this.email = this.email.trim().toLowerCase();

        const existingUser = await UserModel.findByEmail(this.email);
        if (!existingUser) {
            throw new AppError('Invalid email or password', 401);
        }

        const passwordMatch = await bcrypt.compare(this.password, existingUser.password);
        if (!passwordMatch) {
            throw new AppError('Invalid email or password', 401);
        }

        return {
            username: existingUser.username,
            email: existingUser.email
        };
    }
}

module.exports = User;
