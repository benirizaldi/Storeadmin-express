const express = require('express');
const router = express.Router();
const {index,create, store} = require('./controller')

/* GET home page. */
router.get('/', index);
router.get('/create', create);
router.post('/create', store);

module.exports = router;
