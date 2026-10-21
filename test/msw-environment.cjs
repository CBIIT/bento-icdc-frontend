const { TestEnvironment } = require('jest-environment-jsdom');

// Use Node's matching Fetch API implementations so MSW can intercept real HTTP
// requests in jsdom. Keep browser DOM APIs provided by the parent environment.
module.exports = class MswEnvironment extends TestEnvironment {
  constructor(config, context) {
    super(config, context);
    for (const name of [
      'fetch',
      'Request',
      'Response',
      'Headers',
      'FormData',
      'Blob',
      'File',
      'TextEncoder',
      'TextDecoder',
      'ReadableStream',
      'WritableStream',
      'TransformStream',
      'BroadcastChannel',
    ]) {
      this.global[name] = globalThis[name];
    }
  }
};
