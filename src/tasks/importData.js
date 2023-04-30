const { main } = require('./importDevices');
const config = require('dotenv').config({ path: 'dev.env' });
main();