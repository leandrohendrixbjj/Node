const db = require('../config/database');
const countCache = require('../utils/memory-cache');
const { validateMovtoConta, validateFindAll } = require('../validators/movto-contas-validator');
const { COUNT_CACHE_KEY, COUNT_CACHE_TTL_MS } = require('../constants/movto-contas');

const BASE_SELECT_SQL = `
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

const COUNT_SQL = `
  SELECT COUNT(*) AS total
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

    const { page, limit, offset } = validation.data;

    const [rows] = await db.query(
      `${BASE_SELECT_SQL} ORDER BY m.data_vencimento DESC, m.id DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const total = await this._getTotalWithCache();

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

  async _getTotalWithCache() {
    const cachedTotal = countCache.get(COUNT_CACHE_KEY);

    if (cachedTotal != null) {
      return cachedTotal;
    }

    const [[{ total }]] = await db.query(COUNT_SQL);

    countCache.set(COUNT_CACHE_KEY, total, COUNT_CACHE_TTL_MS);

    return total;
  }

  _invalidateCountCache() {
    countCache.delete(COUNT_CACHE_KEY);
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

    this._invalidateCountCache();

    const [rows] = await db.query('SELECT * FROM movto_contas WHERE id = ?', [result.insertId]);

    return rows[0];
  }
}

module.exports = new MovtoContasDomain();
