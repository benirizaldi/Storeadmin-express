const express = require('express');
const router = express.Router();
const { landingPage, detailPage, category, profile, dashboard, updateProfile, checkout, historyDetail, history } = require('./controller')
const { isLoginPlayer } = require('../middleware/auth');
const multer = require('multer');
const os = require('os');
/* GET home page. */
// router.use(isLoginAdmin);

router.get('/', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);
router.get('/profile', isLoginPlayer, profile);
router.post('/checkout', isLoginPlayer, checkout);
router.get('/history', isLoginPlayer, history);
router.get('/history/:id/detail', isLoginPlayer, historyDetail);
router.get('/dashboard', isLoginPlayer, dashboard);
router.get('/profile', isLoginPlayer, profile);
router.put('/profile', isLoginPlayer,
    isLoginPlayer,
    multer({ dest: os.tmpdir() }).single('image'),
    updateProfile
);

module.exports = router;
