const express = require('express');
const router = express.Router();
const { index, create, store, edit, update, destroy } = require('./controller')

/* GET home page. */
router.get('/', index);
router.get('/create', create);
router.post('/create', store);
router.get('/edit/:id', edit);
router.put('/edit/:id', update);
router.delete('/delete/:id', destroy);

module.exports = router;
