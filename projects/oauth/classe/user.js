const UserModel = require('../models/userModel');
const AppError = require('../errors/AppError');

class User {
    constructor({ username, email, password }) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    async validate() {
        if (!this.username?.trim()) {
            throw new AppError('Username is required', 400);
        }

        if (!this.email?.trim()) {
            throw new AppError('Email is required', 400);
        }

        if (!this.password?.trim()) {
            throw new AppError('Password is required', 400);
        }

        const existingUser = await UserModel.findByEmail(this.email);
        if (existingUser) {
            throw new AppError('Email already in use', 409);
        }
    }

    async createAccount() {
        await this.validate();

        return UserModel.create({
            username: this.username,
            email: this.email,
            password: this.password
        });
    }
}

module.exports = User;
