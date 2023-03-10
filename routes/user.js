const express = require('express');
const router = express.Router();



const usercontroller = require('../controllers/usercontroller/usercontroller');


router.get('/settings',usercontroller.settings);


module.exports = router;
