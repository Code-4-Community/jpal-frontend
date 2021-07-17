/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
// ./pact/setup.js
const path = require('path');
const Pact = require('@pact-foundation/pact').Pact;

global.port = 8080;
global.provider = new Pact({
    cors: true,
    port: global.port,
    log: path.resolve(process.cwd(), 'pact/logs', 'pact.log'),
    loglevel: 'debug',
    dir: path.resolve(process.cwd(), 'pact/pacts'),
    spec: 2,
    consumer: 'jpal-frontend',
    provider: 'jpal-backend',
    host: '127.0.0.1'
});
