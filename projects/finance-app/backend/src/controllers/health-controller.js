const healthRepository = require('../repository/health-repository');

class HealthController {
  async health(req, res) {
    return res.json({
      status: 'UP',
      timestamp: new Date().toISOString()
    });
  }

  async details(req, res) {
    try {
      const result = await healthRepository.getHealth();

      return res.json(result);
    } catch (error) {
      return res.status(503).json({
        status: 'DOWN',
        error: error.message
      });
    }
  }
}

module.exports = new HealthController();
