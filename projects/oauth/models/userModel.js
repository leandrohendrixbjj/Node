const { getDb } = require('../util/database');

class UserModel {
    static async create({ username, email, password }) {
        const db = getDb();
        return db.collection('users').insertOne({ username, email, password });
    }

    static async findByEmail(email) {
        const db = getDb();
        return db.collection('users').findOne({ email });
    }
}

module.exports = UserModel;
