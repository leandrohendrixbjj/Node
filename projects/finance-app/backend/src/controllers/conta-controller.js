const contaDomain = require('../domain/conta-domain');
const { validateCreate } = require('../validators/conta-validator');

class ContaController {
  async create(req, res) {
    try {
      const validation = validateCreate(req.body);

      if (validation.error) {
        return res.status(400).json({ error: validation.error });
      }

      const conta = await contaDomain.create(validation.data);

      return res.status(201).json(conta);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }
}

module.exports = new ContaController();
