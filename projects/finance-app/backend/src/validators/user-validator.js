function validateUser(body) {
  const { username, password, ativo } = body;

  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    return { error: 'username é obrigatório' };
  }

  const usernameNormalizado = username.trim();

  if (usernameNormalizado.length < 3) {
    return { error: 'username deve ter no mínimo 3 caracteres' };
  }

  if (usernameNormalizado.length > 50) {
    return { error: 'username deve ter no máximo 50 caracteres' };
  }

  if (!password || typeof password !== 'string' || password.length === 0) {
    return { error: 'password é obrigatório' };
  }

  if (password.length < 3) {
    return { error: 'password deve ter no mínimo 3 caracteres' };
  }

  return {
    data: {
      username: usernameNormalizado,
      password,
      ativo
    }
  };
}

function validateDeleteAt(params) {
  const id = Number(params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return { error: 'id inválido' };
  }

  return { data: { id } };
}

module.exports = { validateUser, validateDeleteAt };
