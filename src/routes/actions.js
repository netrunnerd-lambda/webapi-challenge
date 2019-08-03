const express = require('express');
const router = express.Router();

const actions = require('../controllers/actions');

router.get('/', actions.all);
router.get('/:id', actions.one);

module.exports = router;