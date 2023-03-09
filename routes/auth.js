const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller/usercontroller');
const validators = require('../middlewares/userValidation');

router.get('/login',usercontroller.login);
router.post('/register', validators.userRegistrationValidators ,usercontroller.register);

module.exports = router;