const express = require('express');
const router = express.Router();
const { index, create, store, edit, update, destroy, updateStatus } = require('./controller')
const { isLoginAdmin } = require('../middleware/auth');

/* GET home page. */
router.use(isLoginAdmin);

router.get('/', index);
router.get('/create', create);
router.post('/create', store);
router.get('/edit/:id', edit);
router.put('/edit/:id', update);
router.put('/status/:id', updateStatus);
router.delete('/delete/:id', destroy);

module.exports = router;
