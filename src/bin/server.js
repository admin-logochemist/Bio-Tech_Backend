const { bootstrap } = require('../bootstrap');
const app = require('../app');
require('dotenv').config();

const port=process.env.PORT

let server;
bootstrap().then(() => {
  console.info('Starting server');
  server = app.listen(port, () => {
    console.info(`Listening to port ${port}`);
  });
});



