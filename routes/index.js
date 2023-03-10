const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homecontroller/homecontroller');

router.get('/', homeController.home);

router.use('/auth', require('./auth'));

router.use('/user', require('./user'));

module.exports = router;