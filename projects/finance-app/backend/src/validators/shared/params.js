function validateDeleteAt(params) {
  const id = Number(params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return { error: 'id inválido' };
  }

  return { data: { id } };
}

module.exports = { validateDeleteAt };
