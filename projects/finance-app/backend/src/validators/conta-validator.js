const { normalizeUpperCase } = require('../utils/normalize');
const { TIPOS_VALIDOS, RECORRENCIAS_VALIDAS, DIRECOES_VALIDAS, CAMPOS_ORDENACAO } = require('../constants/conta');
const { validateDeleteAt } = require('./shared/params');

function validateConta(body, params) {
  const isUpdate = params != null;
  let id;

  if (isUpdate) {
    id = Number(params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return { error: 'id inválido' };
    }
  }

  const { descricao, tipo, recorrencia, ativa = true } = body;

  const tipoNormalizado = normalizeUpperCase(tipo);
  const recorrenciaNormalizada = normalizeUpperCase(recorrencia);

  if (!descricao || typeof descricao !== 'string' || descricao.trim().length === 0) {
    return { error: 'descricao é obrigatória' };
  }

  if (descricao.length > 100) {
    return { error: 'descricao deve ter no máximo 100 caracteres' };
  }

  if (!isUpdate && (!tipoNormalizado || !TIPOS_VALIDOS.includes(tipoNormalizado))) {
    return { error: 'tipo deve ser RECEITA ou DESPESA' };
  }

  if (!recorrenciaNormalizada || !RECORRENCIAS_VALIDAS.includes(recorrenciaNormalizada)) {
    return { error: 'recorrencia deve ser FIXA ou VARIAVEL' };
  }

  if (typeof ativa !== 'boolean') {
    return { error: 'ativa deve ser um valor booleano' };
  }

  const data = {
    descricao: descricao.trim(),
    recorrencia: recorrenciaNormalizada,
    ativa
  };

  if (isUpdate) {
    data.id = id;
  } else {
    data.tipo = tipoNormalizado;
  }

  return { data };
}

function validateFindAll(query) {
  const { ordenar, direcao = 'asc' } = query;

  if (!ordenar) {
    return { data: {} };
  }

  const campo = CAMPOS_ORDENACAO[ordenar.toLowerCase()];

  if (!campo) {
    return { error: 'ordenar deve ser nome ou descricao' };
  }

  const direcaoNormalizada = direcao.toLowerCase();

  if (!DIRECOES_VALIDAS.includes(direcaoNormalizada)) {
    return { error: 'direcao deve ser asc ou desc' };
  }

  return {
    data: {
      orderBy: campo,
      direction: direcaoNormalizada
    }
  };
}

module.exports = { validateConta, validateFindAll, validateDeleteAt };
