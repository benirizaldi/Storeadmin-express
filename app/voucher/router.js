const express = require('express');
const router = express.Router();
const { index, create, store, edit, update, destroy, updateStatus } = require('./controller')
const multer = require('multer');
const os = require('os');
/* GET home page. */
router.get('/', index);
router.get('/create', create);
router.post('/create', multer({ dest: os.tmpdir() }).single('thumbnail'), store);
router.get('/edit/:id', edit);
router.put('/edit/:id', multer({ dest: os.tmpdir() }).single('thumbnail'), update);
router.delete('/delete/:id', destroy);
router.put('/status/:id', updateStatus);

module.exports = router;
