const express = require('express');
const router = express.Router();
const { viewSignIn, actionSignIn, logout } = require('./controller')

/* GET home page. */
router.get('/', viewSignIn);
router.post('/', actionSignIn);
router.get('/logout', logout);

module.exports = router;
