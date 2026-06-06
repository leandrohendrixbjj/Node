const movtoContasDomain = require('../domain/movto-contas-domain');

class MovtoContasController {
  async findAll(req, res) {
    try {
      return res.json({
        message: 'Metodo findAll não implementado.',
        data: []
      });      
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      return res.json({
        message: 'Metodo create não implementado.',
        data: []
      });
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
