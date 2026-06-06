module.exports = {
  STATUS_VALIDOS: ['PENDENTE', 'PAGO', 'CANCELADO'],
  PAGINATION_DEFAULT_PAGE: 1,
  PAGINATION_DEFAULT_LIMIT: 20,
  PAGINATION_MAX_LIMIT: 100,
  COUNT_CACHE_KEY: 'movto-contas:total',
  COUNT_CACHE_TTL_MS: 60_000,
  DIRECOES_VALIDAS: ['asc', 'desc'],
  CAMPOS_ORDENACAO: {
    conta_id: 'm.conta_id',
    tipo: 'c.tipo',
    data_vencimento: 'm.data_vencimento',
    status: 'm.status'
  }
};
