const { getDb } = require('../util/database');

class User {
    constructor({ username, email, password }) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    validate() {
        if (!this.username?.trim()) {
            throw new Error('Username is required');
        }

        if (!this.email?.trim()) {
            throw new Error('Email is required');
        }

        if (!this.password?.trim()) {
            throw new Error('Password is required');
        }
    }

    async save() {
        this.validate();
        const db = getDb();
        return db.collection('users').insertOne({
            username: this.username,
            email: this.email,
            password: this.password
        });
    }
}

module.exports = User;
