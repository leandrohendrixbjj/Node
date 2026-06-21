const db = require('../config/database');
const bcrypt = require('bcrypt');
const { validateCreateUser, validateUpdateUser, validateDeleteAt } = require('../validators/user-validator');

const USER_SELECT_FIELDS = 'id, username, ativo, created_at, updated_at';

class UserRepository {
  _validateCreate(body) {
    const validation = validateCreateUser(body);

    if (validation.error) {
      const error = new Error(validation.error);
      error.statusCode = 400;
      throw error;
    }

    return validation.data;
  }

  _validateUpdate(body) {
    const validation = validateUpdateUser(body);

    if (validation.error) {
      const error = new Error(validation.error);
      error.statusCode = 400;
      throw error;
    }

    return validation.data;
  }

  async findByUsername(username) {
    const [rows] = await db.query(
      `SELECT ${USER_SELECT_FIELDS} FROM users WHERE username = ?`,
      [username]
    );

    return rows[0] ?? null;
  }

  async findById(id) {
    const [rows] = await db.query(
      `SELECT ${USER_SELECT_FIELDS} FROM users WHERE id = ?`,
      [id]
    );

    return rows[0] ?? null;
  }

  async findByIdOrFail(id) {
    const user = await this.findById(id);

    if (!user) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return user;
  }

  async findByUsernameOrFail(username) {
    const user = await this.findByUsername(username);

    if (!user) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return user;
  }

  async findOneByUsername(params) {
    const { username } = params;

    return this.findByUsernameOrFail(username);
  }

  async create(body) {
    const { username, password } = this._validateCreate(body);

    if (await this.findByUsername(username)) {
      const error = new Error(`Usuário "${username}" já cadastrado`);
      error.statusCode = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, passwordHash]
    );

    const [rows] = await db.query(
      `SELECT ${USER_SELECT_FIELDS} FROM users WHERE id = ?`,
      [result.insertId]
    );

    return rows[0];
  }

  async deleteAt(params) {
    const validation = validateDeleteAt(params);

    if (validation.error) {
      const error = new Error(validation.error);
      error.statusCode = 400;
      throw error;
    }

    const { id } = validation.data;

    await this.findByIdOrFail(id);

    await db.query('UPDATE users SET ativo = 0 WHERE id = ?', [id]);

    return this.findById(id);
  }

  async update(body, params) {
    const data = this._validateUpdate(body);
    const { id } = params;    
        
    await this.findByIdOrFail(id);

    const { ativo, password } = data;

    const passwordHash = await bcrypt.hash(password, 10);

    await db.query('UPDATE users SET ativo = ?, password_hash = ?, updated_at = NOW() WHERE id = ?', [ativo, passwordHash, id]);

    return this.findById(id);
  }
}

module.exports = new UserRepository();
