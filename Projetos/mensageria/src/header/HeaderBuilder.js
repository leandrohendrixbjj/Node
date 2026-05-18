const Helper = require('../domain/Helper');

class HeaderBuilder {
  constructor(mode = null) {        
    this.mode = mode === null ? this.onlyTimestamp() : mode;
    this.timestampFn = () => new Date();
  }

  onlyTimestamp() {
    return {
      timestamp: this.timestampFn(),
    };
  }

  withMessageId() {
    const message_id = Helper.randomHashUint32();
    return {
      message_id,
      timestamp: this.timestampFn(),
    };
  }
}

module.exports = HeaderBuilder;
