const crypto = require('crypto');

class Helper {
  static randomHashUint32() {
    return crypto
      .createHash('sha256')
      .update(crypto.randomBytes(16))
      .digest()
      .readUInt32BE(0);
  }
}

module.exports = Helper;
