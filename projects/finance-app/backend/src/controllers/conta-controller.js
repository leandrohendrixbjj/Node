const contaDomain = require('../domain/conta-domain');

class ContaController {
  async findAll(req, res) {
    try {
      const contas = await contaDomain.findAll(req.query);

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
      const conta = await contaDomain.create(req.body);

      return res.status(201).json(conta);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const conta = await contaDomain.update(req.body, req.params);

      return res.json(conta);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }

  async deleteAt(req, res) {
    try {
      const conta = await contaDomain.deleteAt(req.params);

      return res.json(conta);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }
}

module.exports = new ContaController();
