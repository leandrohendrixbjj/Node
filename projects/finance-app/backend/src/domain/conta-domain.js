const db = require('../config/database');

class ContaService {
  async findAll({ orderBy, direction } = {}) {
    let query = 'SELECT * FROM contas';

    if (orderBy) {
      const sortDirection = direction === 'desc' ? 'DESC' : 'ASC';
      query += ` ORDER BY ${orderBy} ${sortDirection}`;
    }

    const [rows] = await db.query(query);

    return rows;
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM contas WHERE id = ?', [id]);

    return rows[0] ?? null;
  }

  async validateExistsById(id) {
    const conta = await this.findById(id);

    if (!conta) {
      const error = new Error('Conta não encontrada');
      error.statusCode = 404;
      throw error;
    }

    return conta;
  }

  async findByDescricao(descricao) {
    const [rows] = await db.query(
      'SELECT id FROM contas WHERE descricao = ?',
      [descricao]
    );

    return rows[0] ?? null;
  }

  async create(data) {
    const contaExistente = await this.findByDescricao(data.descricao);

    if (contaExistente) {
      const error = new Error(`Conta com descricao "${data.descricao}" já cadastrada`);
      error.statusCode = 409;
      throw error;
    }

    const { descricao, tipo, recorrencia, ativa } = data;

    const [result] = await db.query(
      'INSERT INTO contas (descricao, tipo, recorrencia, ativa) VALUES (?, ?, ?, ?)',
      [descricao, tipo, recorrencia, ativa]
    );

    const [rows] = await db.query('SELECT * FROM contas WHERE id = ?', [result.insertId]);

    return rows[0];
  }

  async deleteAt(id) {
    await this.validateExistsById(id);

    await db.query('UPDATE contas SET ativa = 0 WHERE id = ?', [id]);

    return this.findById(id);
  }
}

module.exports = new ContaService();
