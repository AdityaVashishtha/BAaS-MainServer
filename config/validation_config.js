const { check, oneOf,validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

general_param = {
    is_username_email: false,
    password_min: 6,
    password_max: 16
}

if(general_param.is_username_email) {
    signup_validation = [
        sanitize('full_name').trim().escape(),
        sanitize('username').trim().escape().normalizeEmail({all_lowercase: true}),
        sanitize('password').trim().escape(),
        check('full_name','Name field required!').not().isEmpty(),
        check('username','Username field required!').not().isEmpty(),
        check('username','Invalid Email Address for username').isEmail(),
        check('password','Password field required!').exists().not().isEmpty(),
        check('password').isLength({min:general_param.password_min ,max: general_param.password_max}).withMessage('Password length between 6-16')    
        ]    
} else {
    signup_validation = [
        sanitize('full_name').trim().escape(),
        sanitize('username').trim().escape(),
        sanitize('password').trim().escape(),
        check('full_name','Name field required!').not().isEmpty(),
        check('username','Username field required!').not().isEmpty(),
        check('username','Username should only contain letter and numbers').isAlphanumeric(),
        check('password','Password field required!').exists().not().isEmpty(),
        check('password').isLength({min:general_param.password_min ,max: general_param.password_max}).withMessage('Password length between 6-16')    
        ]    
}

module.exports = signup_validation