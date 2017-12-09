const express = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const passport = require('passport');
const crypto = require("crypto");

const config = require('../config/config');
const signup_validation = require('../config/validation_config');

const router = express.Router();

const User = require('../models/user.js');
const Token = require('../models/tokens');

router.get('/login',(req,res)=>{
    res.render('login',{title:'Login'});
});

router.get('/signup',(req,res)=>{
    res.render('signup',{title:'Sign Up'});
});

router.post('/signup',signup_validation,(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('signup',{
            title:'Sign Up',
            errors: errors.mapped()
            });
    } else {
        let user = User();
        user.name = req.body.full_name;
        user.username = req.body.username.toLowerCase();
        user.password = req.body.password;         
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                try {
                    User.find({username: user.username},(err,users)=>{
                        if(users.length){
                            req.flash('warning','Username already in use.');  
                            res.redirect('/users/signup');
                        } else {
                            user.save((err)=>{
                                if(err){
                                    console.log(err);
                                    req.flash('warning','Sorry you are not Registered, Please try again');  
                                    res.redirect('/users/signup');                
                                } else {
                                    req.flash('success','You are registered Succesfully!!');  
                                    res.redirect('/users/login');
                                }
                            });
                        }
                    });                
                } catch (err) {
                    console.log(err);
                    req.flash('danger','Some Error Occured!!');  
                    res.redirect('/users/signup');                
                } 
            });
        });                    
    }    
});

router.post('/login', 
passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }),
function(req, res, next) {
  // issue a remember me cookie if the option was checked
  if (!req.body.remember_me) { return next(); }

  var token = crypto.randomBytes(64).toString('hex');
  let rm = Token();
  rm.username = req.body.username;
  console.log('Username logging :: ');
  console.log(rm.username);
  console.log(req.body.remember_me);
  rm.token = token;
  rm.save((err)=>{
    if (err) { return next(err); }
    res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
    return next();
  });  
},
function(req, res) {
  res.redirect('/');
});

/****
router.post('/login',(req,res,next)=>{
    req.body.username = req.body.username.toLowerCase();
    passport.authenticate('local',{ 
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true 
    })(req,res,next);
    // issue a remember me cookie if the option was checked
    if (!req.body.remember_me) { return next(); }

    var token = utils.generateToken(64);
    Token.save(token, { userId: req.user.id }, function(err) {
        if (err) { return done(err); }
        res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
        return next();
    });
});
****/
// Logout route
router.get('/logout',(req,res)=>{
    res.clearCookie('remember_me');
    if(res.locals.user) {
        query = {username: res.locals.user.username};
        Token.remove(query,(err,wop)=>{
            if(err) console.log(err);
            console.log('user logout token removal');
            console.log(wop.result);
        });
    }    
    req.logout();
    req.flash('success','Succesfully logged out!');
    res.redirect('/users/login');
});

module.exports = router