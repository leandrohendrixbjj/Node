const movtoContasRepository = require('../repository/movto-contas-repository');

class MovtoContasController {
  async findAll(req, res) {
    try {
      const result = await movtoContasRepository.findAll(req.query);

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
      const movtoConta = await movtoContasRepository.create(req.body);

      return res.status(201).json(movtoConta);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const movtoConta = await movtoContasRepository.update(req.body, req.params);

      return res.json(movtoConta);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }

  async deleteAt(req, res) {
    try {
      const movtoConta = await movtoContasRepository.deleteAt(req.params);

      return res.json(movtoConta);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }
}

module.exports = new MovtoContasController();
