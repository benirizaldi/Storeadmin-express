const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('./controller');
const multer = require('multer');
const os = require('os');

router.post('/login', signIn);
router.post('/register', multer({ dest: os.tmpdir() }).single('image'), signUp);

module.exports = router;
