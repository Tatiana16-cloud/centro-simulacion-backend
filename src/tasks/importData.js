const { main } = require('./importDevices');
const config = require('dotenv').config({ path: 'dev.env' });
(async()=>{
    const result = await main();
    console.log(result);
    process.exit(0)
})()