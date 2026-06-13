const db = require('../config/database');
const countCache = require('../utils/memory-cache');
const { COUNT_CACHE_KEY, COUNT_CACHE_TTL_MS } = require('../constants/movto-contas');

const MOVTO_CONTAS_COUNT_SQL = `
  SELECT COUNT(*) AS total
  FROM movto_contas m
  INNER JOIN contas c
    ON c.id = m.conta_id
`;

async function getTotalWithCache() {
  const cachedTotal = countCache.get(COUNT_CACHE_KEY);

  if (cachedTotal != null) {
    return cachedTotal;
  }

  const [[{ total }]] = await db.query(MOVTO_CONTAS_COUNT_SQL);

  countCache.set(COUNT_CACHE_KEY, total, COUNT_CACHE_TTL_MS);

  return total;
}

function invalidateCountCache() {
  countCache.delete(COUNT_CACHE_KEY);
}

module.exports = {
  getTotalWithCache,
  invalidateCountCache
};
