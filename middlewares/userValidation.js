const {body} = require('express-validator');


module.exports.userRegistrationValidators = [
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter a valid email'),
        body('password').notEmpty().withMessage('Password is required').isLength({min:8}).withMessage('Password must be at least 8 characters long'),
];
