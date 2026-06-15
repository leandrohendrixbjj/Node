const userRepository = require('../repository/user-repository');

class UserController {
  async findOneByUsername(req, res) {
    try {
      const user = await userRepository.findOneByUsername(req.params);

      return res.json(user);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const user = await userRepository.create(req.body);

      return res.status(201).json(user);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }

  async deleteAt(req, res) {
    try {
      const user = await userRepository.deleteAt(req.params);

      return res.json(user);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }
  
  async update(req, res) {
    try {
      const user = await userRepository.update(req.body, req.params);

      return res.json(user);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
