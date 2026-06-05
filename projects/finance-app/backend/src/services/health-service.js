const db = require('../config/database');

class HealthService {
  async checkMysql() {
    await db.query('SELECT 1');

    return {
      status: 'UP'
    };
  }

  async checkEventLoop() {
    const start = process.hrtime.bigint();

    await new Promise(resolve => setTimeout(resolve, 0));

    const end = process.hrtime.bigint();

    const lagMs = Number(end - start) / 1_000_000;

    return {
      status: lagMs < 100 ? 'UP' : 'DOWN',
      lagMs: Number(lagMs.toFixed(2))
    };
  }

  async getHealth() {
    const [eventLoop, mysql] = await Promise.all([
      this.checkEventLoop(),
      this.checkMysql()
    ]);

    return {
      status: 'UP',
      checks: {
        app: {
          status: 'UP'
        },
        eventLoop,
        mysql
      }
    };
  }
}

module.exports = new HealthService();