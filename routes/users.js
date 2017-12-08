const express = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const passport = require('passport');

const config = require('../config/config');
const signup_validation = require('../config/validation_config');

const router = express.Router();

const User = require('../models/user.js');

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

router.post('/login',(req,res,next)=>{
    req.body.username = req.body.username.toLowerCase();
    passport.authenticate('local',{ 
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true 
    })(req,res,next);
});

// Logout route
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success','Succesfully logged out!');
    res.redirect('/users/login');
});

module.exports = router