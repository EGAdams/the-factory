import { EventEmitter } from 'events';

class TheEmitter extends EventEmitter {
  constructor() {
    super();
  }

  foo(): void {
    this.emit('test');
  }
}

export default TheEmitter;
