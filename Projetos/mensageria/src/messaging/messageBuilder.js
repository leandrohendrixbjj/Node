const HeaderBuilder = require('../header/HeaderBuilder');

class MessageBuilder {
  constructor(payload, header = null) {
    this.payload = payload;
    this.header = header === null ? new HeaderBuilder('onlyTimestamp') : header;
    this.message = this.build();
  }

  build() {
    const headers =
      this.header.mode === 'onlyTimestamp'
        ? this.header.onlyTimestamp()
        : this.header.withMessageId();

    return {
      payload: this.payload,
      headers,
    };
  }
}

module.exports = MessageBuilder;
