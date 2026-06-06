const { normalizeUpperCase } = require('../utils/normalize');
const {
  STATUS_VALIDOS,
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_MAX_LIMIT
} = require('../constants/movto-contas');
const contaDomain = require('../domain/conta-domain');

async function validateMovtoConta(body) {
  const { conta_id, valor, data_vencimento, status = 'PAGO', observacao, ativa = true } = body;

  const contaId = Number(conta_id);

  if (!Number.isInteger(contaId) || contaId <= 0) {
    return { error: `conta_id inválido` };
  }

  const conta = await contaDomain.findById(contaId);

  if (!conta) {
    return { error: `Conta: ${contaId} não possui cadastro.`, statusCode: 404 };
  }

  const valorNumerico = Number(valor);

  if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
    return { error: 'valor deve ser um número positivo' };
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(data_vencimento)) {
    return { error: 'data_vencimento deve estar no formato YYYY-MM-DD' };
  }

  const dataVencimento = new Date(`${data_vencimento}T00:00:00`);

  if (Number.isNaN(dataVencimento.getTime())) {
    return { error: 'data_vencimento inválida' };
  }

  const statusNormalizado = normalizeUpperCase(status);

  if (!statusNormalizado || !STATUS_VALIDOS.includes(statusNormalizado)) {
    return { error: 'status deve ser PENDENTE, PAGO ou CANCELADO' };
  }

  if (observacao != null && typeof observacao !== 'string') {
    return { error: 'observacao deve ser um texto' };
  }

  if (typeof ativa !== 'boolean') {
    return { error: 'ativa deve ser um valor booleano' };
  }

  return {
    data: {
      conta_id: contaId,
      valor: valorNumerico.toFixed(2),
      data_vencimento,
      status: statusNormalizado,
      observacao: observacao?.trim() || null,
      ativa
    }
  };
}

function validateFindAll(query) {
  const page = Number(query.page ?? PAGINATION_DEFAULT_PAGE);
  const limit = Number(query.limit ?? PAGINATION_DEFAULT_LIMIT);

  if (!Number.isInteger(page) || page <= 0) {
    return { error: 'page deve ser um inteiro positivo' };
  }

  if (!Number.isInteger(limit) || limit <= 0 || limit > PAGINATION_MAX_LIMIT) {
    return { error: `limit deve ser entre 1 e ${PAGINATION_MAX_LIMIT}` };
  }

  return {
    data: {
      page,
      limit,
      offset: (page - 1) * limit
    }
  };
}

module.exports = { validateMovtoConta, validateFindAll };
