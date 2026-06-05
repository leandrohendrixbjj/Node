const { normalizeUpperCase } = require('../utils/normalize');

const TIPOS_VALIDOS = ['RECEITA', 'DESPESA'];
const RECORRENCIAS_VALIDAS = ['FIXA', 'VARIAVEL'];

function validateCreate(body) {
  const { descricao, tipo, recorrencia, ativa = true } = body;

  const tipoNormalizado = normalizeUpperCase(tipo);
  const recorrenciaNormalizada = normalizeUpperCase(recorrencia);

  if (!descricao || typeof descricao !== 'string' || descricao.trim().length === 0) {
    return { error: 'descricao é obrigatória' };
  }

  if (descricao.length > 100) {
    return { error: 'descricao deve ter no máximo 100 caracteres' };
  }

  if (!tipoNormalizado || !TIPOS_VALIDOS.includes(tipoNormalizado)) {
    return { error: 'tipo deve ser RECEITA ou DESPESA' };
  }

  if (!recorrenciaNormalizada || !RECORRENCIAS_VALIDAS.includes(recorrenciaNormalizada)) {
    return { error: 'recorrencia deve ser FIXA ou VARIAVEL' };
  }

  if (typeof ativa !== 'boolean') {
    return { error: 'ativa deve ser um valor booleano' };
  }

  return {
    data: {
      descricao: descricao.trim(),
      tipo: tipoNormalizado,
      recorrencia: recorrenciaNormalizada,
      ativa
    }
  };
}

module.exports = { validateCreate };
