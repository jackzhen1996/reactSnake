const express = require('express');
const cors = require('cors')
const app = express();
const http = require('http').createServer(app);
// const server = http.createServer(app);
const path = require('path');
// const httpProxy = require('http-proxy');
require('dotenv').config();

// serve static file
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));
app.set('port', 3000);

http.listen(app.get('port'), () => {
  console.log(`Snake client running on 3000`)
})