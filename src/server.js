const errorHandler = require('./middleware/errorHandler');
const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ 
    message: "new phone. who dis?",
    success: true
  });
});

server.use('/api', require('./routes'));

server.use(errorHandler);

module.exports = server;