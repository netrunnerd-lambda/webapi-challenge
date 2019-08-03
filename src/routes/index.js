const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: "do u even api?",
    success: true
  });
});

module.exports = router;