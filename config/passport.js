const LocalStrategy = require('passport-local').Strategy;
const RememberMeStrategy = require('passport-remember-me').Strategy;
const config = require('./database');
const User = require('../models/user');
const Token = require('../models/tokens');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


module.exports = (passport)=>{       
    passport.use(new LocalStrategy((username,password,done)=>{
        let query = {username: username};
        User.findOne(query,(err,user)=>{
            if(err) throw err;
            if(!user){
                return done(null,false,{message: 'No user found!!'})
            }

            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) throw err;
                if(isMatch) {
                    return done(null,user);
                } else {
                    return done(null,false,{message: 'Username or Password wrong!!'})
                }
            });

        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });

    passport.use(new RememberMeStrategy(
        function(token, done) {
            let query = {token: token};
            Token.findOne(query,(err,rememberMe)=>{

                query = {token: token};
                console.log('Query for deletion');
                console.log(query);
                Token.remove(query,(err,wop)=>{
                    if (err) { return done(err); }
                    console.log('User after query deletion');
                    console.log(wop.result)
                    if(rememberMe != null)
                        query = {username: rememberMe.username};
                    else    
                        return done(null, false);                                               
                    User.findOne(query,(err,user)=>{
                        console.log(user);
                        if (err) { return done(err); }
                        if (!user) {
                            return done(null, false);                     
                        }
                        return done(null, user);                                        
                    });
                });                                
            });                                  
        },
        function(user, done) {
            var token = crypto.randomBytes(64).toString('hex');
            let rm = Token();
            rm.username = user.username;
            rm.token = token;
            rm.save((err)=>{
                if (err) { return done(err); }
                return done(null, token);
            });                            
        }
      ));
}  