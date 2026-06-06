const db = require('../config/database');
const { validateMovtoConta } = require('../validators/movto-contas-validator');

class MovtoContasDomain {
  async _validateMovtoConta(body) {
    const validation = await validateMovtoConta(body);

    if (validation.error) {
      const error = new Error(validation.error);
      error.statusCode = validation.statusCode || 400;
      throw error;
    }

    return validation.data;
  }

  async create(body) {
    const data = await this._validateMovtoConta(body);

    const { conta_id, valor, data_vencimento, status, observacao, ativa } = data;

    const [result] = await db.query(
      'INSERT INTO movto_contas (conta_id, valor, data_vencimento, status, ativa, observacao) VALUES (?, ?, ?, ?, ?, ?)',
      [conta_id, valor, data_vencimento, status, ativa, observacao]
    );

    const [rows] = await db.query('SELECT * FROM movto_contas WHERE id = ?', [result.insertId]);

    return rows[0];
  }
}

module.exports = new MovtoContasDomain();
