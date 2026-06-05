function normalizeUpperCase(value) {
  return typeof value === 'string' ? value.toUpperCase() : value;
}

module.exports = { normalizeUpperCase };
