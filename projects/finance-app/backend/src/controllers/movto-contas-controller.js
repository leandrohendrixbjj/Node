const movtoContasDomain = require('../domain/movto-contas-domain');

class MovtoContasController {
  async findAll(req, res) {
    try {
      const result = await movtoContasDomain.findAll(req.query);

      if (result.data.length === 0) {
        return res.json({
          message: 'Nenhuma movimentação cadastrada.',
          data: [],
          pagination: result.pagination
        });
      }

      return res.json(result);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const movtoConta = await movtoContasDomain.create(req.body);

      return res.status(201).json(movtoConta);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      return res.json({
        message: 'Metodo update não implementado.',
        data: []
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }

  async deleteAt(req, res) {
    try {
      return res.json({
        message: 'Metodo deleteAt não implementado.',
        data: []
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }
}

module.exports = new MovtoContasController();
