const db = require('../config/database');

class ContaService {
  async create({ descricao, tipo, recorrencia, ativa }) {
    const [result] = await db.query(
      'INSERT INTO contas (descricao, tipo, recorrencia, ativa) VALUES (?, ?, ?, ?)',
      [descricao, tipo, recorrencia, ativa]
    );

    const [rows] = await db.query('SELECT * FROM contas WHERE id = ?', [result.insertId]);

    return rows[0];
  }
}

module.exports = new ContaService();
