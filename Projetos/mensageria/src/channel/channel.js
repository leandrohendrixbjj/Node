const EventEmitter = require('events');

class Channel {
  constructor() {
    this.bus = new EventEmitter();
  }

  publish(channelName, message) {
    this.bus.emit(channelName, message);
  }

  subscribe(channelName, handler) {
    this.bus.on(channelName, handler);
  }
}

// instância única (singleton)
const channel = new Channel();

module.exports = channel;
