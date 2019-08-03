const express = require('express');
const router = express.Router();

const projects = require('../controllers/projects');

router.get('/', projects.all);

module.exports = router;