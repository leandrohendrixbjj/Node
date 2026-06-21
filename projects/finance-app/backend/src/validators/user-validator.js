const { validateDeleteAt } = require('./shared/params');

function validatePassword(password) {
  if (!password || typeof password !== 'string' || password.length === 0) {
    return { error: 'password é obrigatório' };
  }

  if (password.length < 3) {
    return { error: 'password deve ter no mínimo 3 caracteres' };
  }

  return { data: password };
}

function validateCreateUser(body) {
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

  const passwordValidation = validatePassword(password);
  if (passwordValidation.error) {
    return passwordValidation;
  }

  return {
    data: {
      username: usernameNormalizado,
      password: passwordValidation.data,
      ativo
    }
  };
}

function validateUpdateUser(body) {
  const { password, ativo } = body;

  const passwordValidation = validatePassword(password);
  if (passwordValidation.error) {
    return passwordValidation;
  }

  if (ativo !== undefined && ativo !== 0 && ativo !== 1) {
    return { error: 'ativo deve ser 0 ou 1' };
  }

  return {
    data: {
      password: passwordValidation.data,
      ativo
    }
  };
}

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateDeleteAt
};
