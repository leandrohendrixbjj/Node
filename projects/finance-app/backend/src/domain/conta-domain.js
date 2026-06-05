const db = require('../config/database');
const { validateConta, validateFindAll, validateDeleteAt } = require('../validators/conta-validator');

class ContaService {
  async findAll(query) {
    const validation = validateFindAll(query);

    if (validation.error) {
      const error = new Error(validation.error);
      error.statusCode = 400;
      throw error;
    }

    const { orderBy, direction } = validation.data;

    let sql = 'SELECT * FROM contas';

    if (orderBy) {
      const sortDirection = direction === 'desc' ? 'DESC' : 'ASC';
      sql += ` ORDER BY ${orderBy} ${sortDirection}`;
    }

    const [rows] = await db.query(sql);

    return rows;
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM contas WHERE id = ?', [id]);

    return rows[0] ?? null;
  }

  async findByIdOrFail(id) {
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

  async ensureDescricaoAvailable(descricao, excludeId = null) {
    const contaExistente = await this.findByDescricao(descricao);

    if (contaExistente && contaExistente.id !== excludeId) {
      const error = new Error(`Conta com descricao "${descricao}" já cadastrada`);
      error.statusCode = 409;
      throw error;
    }
  }

  _validateConta(body, params) {
    const validation = validateConta(body, params);

    if (validation.error) {
      const error = new Error(validation.error);
      error.statusCode = 400;
      throw error;
    }

    return validation.data;
  }

  async create(body) {
    const data = this._validateConta(body);

    await this.ensureDescricaoAvailable(data.descricao);

    const { descricao, tipo, recorrencia, ativa } = data;

    const [result] = await db.query(
      'INSERT INTO contas (descricao, tipo, recorrencia, ativa) VALUES (?, ?, ?, ?)',
      [descricao, tipo, recorrencia, ativa]
    );

    const [rows] = await db.query('SELECT * FROM contas WHERE id = ?', [result.insertId]);

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

    await db.query('UPDATE contas SET ativa = 0 WHERE id = ?', [id]);

    return this.findById(id);
  }

  async update(body, params) {
    const { id, ...data } = this._validateConta(body, params);
    await this.findByIdOrFail(id);

    const { descricao, recorrencia, ativa } = data;

    await this.ensureDescricaoAvailable(descricao, id);

    await db.query(
      'UPDATE contas SET descricao = ?, recorrencia = ?, ativa = ?, updated_at = NOW() WHERE id = ?',
      [descricao, recorrencia, ativa, id]
    );

    return this.findById(id);
  }
}

module.exports = new ContaService();
