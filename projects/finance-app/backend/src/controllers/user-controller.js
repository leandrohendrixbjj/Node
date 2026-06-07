const userDomain = require('../domain/user-domain');

class UserController {
  async findOneByUsername(req, res) {
    try {
        return res.json({
          message: 'Rota user FIND ONE BY USERNAME não implementada.',
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
        message: 'Rota user  CREATE não implementada.',
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
        message: 'Rota user DELETE AT não implementada.',
        data: []
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
