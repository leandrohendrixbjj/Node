const db = require('../config/database');
const { getTotalWithCache, invalidateCountCache } = require('./cache');
const { validateMovtoConta, validateFindAll, validateDeleteAt } = require('../validators/movto-contas-validator');

const MOVTO_CONTAS_SELECT_SQL = `
  SELECT
    m.id,
    c.descricao AS conta,
    c.tipo,
    m.valor,
    m.data_vencimento,
    m.status
  FROM movto_contas m
  INNER JOIN contas c
    ON c.id = m.conta_id
`;

class MovtoContasDomain {
  async findAll(query) {
    const validation = validateFindAll(query);

    if (validation.error) {
      const error = new Error(validation.error);
      error.statusCode = 400;
      throw error;
    }

    const { page, limit, offset, orderBy, direction } = validation.data;

    const sortDirection = orderBy
      ? (direction === 'desc' ? 'DESC' : 'ASC')
      : 'DESC';
    const orderClause = orderBy
      ? `ORDER BY ${orderBy} ${sortDirection}, m.id DESC`
      : 'ORDER BY m.data_vencimento DESC, m.id DESC';

    const [rows] = await db.query(
      `${MOVTO_CONTAS_SELECT_SQL} ${orderClause} LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const total = await getTotalWithCache();

    return {
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

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

    invalidateCountCache();

    const [rows] = await db.query('SELECT * FROM movto_contas WHERE id = ?', [result.insertId]);

    return rows[0];
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM movto_contas WHERE id = ?', [id]);

    return rows[0] ?? null;
  }

  async findByIdOrFail(id) {
    const movtoConta = await this.findById(id);

    if (!movtoConta) {
      const error = new Error('Movimentação não encontrada');
      error.statusCode = 404;
      throw error;
    }

    return movtoConta;
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

    await db.query('UPDATE movto_contas SET ativa = 0 WHERE id = ?', [id]);

    return this.findById(id);
  }
}

module.exports = new MovtoContasDomain();
