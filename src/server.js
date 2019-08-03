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

module.exports = server;