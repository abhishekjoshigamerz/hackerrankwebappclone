const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homecontroller/homecontroller');

router.get('/', homeController.home);
router.use('/auth', require('./auth'));

module.exports = router;