const LocalStrategy = require('passport-local').Strategy;
const config = require('./database');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


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
}  