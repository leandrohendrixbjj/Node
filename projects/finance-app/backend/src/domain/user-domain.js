const db = require('../config/database');
const bcrypt = require('bcrypt');
const { validateUser } = require('../validators/user-validator');

const USER_SELECT_FIELDS = 'id, username, ativo, created_at, updated_at';

class UserDomain {
  _validateUser(body) {
    const validation = validateUser(body);

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
    const { username, password } = this._validateUser(body);

    if (await this.findByUsername(username)) {
      const error = new Error(`Usuário "${username}" já cadastrado`);
      error.statusCode = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return usuarioRepository.create({
      username,
      passwordHash
    });
  }
}

module.exports = new UserDomain();
