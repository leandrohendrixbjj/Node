const contaDomain = require('../domain/conta-domain');
const { validateCreate, validateFindAll } = require('../validators/conta-validator');

class ContaController {
  async findAll(req, res) {
    try {
      const validation = validateFindAll(req.query);

      if (validation.error) {
        return res.status(400).json({ error: validation.error });
      }

      const contas = await contaDomain.findAll(validation.data);

      if (contas.length === 0) {
        return res.json({
          message: 'Nenhuma conta cadastrada.',
          data: []
        });
      }

      return res.json(contas);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }

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
