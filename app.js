const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressValidator = require("express-validator");
const passport = require("passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const config = require("./config/config");
const db_config = require("./config/database");

const app = express();

// Setting body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// Connection to database with bluebird promise
mongoose.Promise = require('bluebird');
mongoose.connect(db_config.local,{useMongoClient: true});
let db = mongoose.connection;
db.on('error',(err)=>{
    console.log(err);
});
db.once('open',()=>{
    console.log('MongoDB connected');
});

// Setting session middleware
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true  
}));

// Setting express messaging middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Setting up cookie parser for remember me logic
app.use(cookieParser());

// Passport Initialization
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

// Setting global variable for user when logged in
app.get('*',(req, res, next)=>{    
    res.locals.user = req.user || null;
    next();
});

// Set  :: Public folder as default static path
app.use(express.static(path.join(__dirname,'public')));

// Set :: View Engine Pug
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// Index Page default Route set
app.get('/',authenticateAccess,(req,res)=>{     
    console.log('Request of (' + res.locals.user.username + ') from IP:: ' + req.connection.remoteAddress);   
    let page_param = {
        title: 'Home',
        search_bar: false,
        navbar: true,
        sidebar: false,
        notification: true,
        help_button: false
    };
    res.render('app_home',page_param);
});

app.post('/createApplication',(req,res)=>{
    if(!req.user.username) {
        res.status(401).send();
        return;
    } else {
        console.log("Application Creation Request with params need to create application here. By ::" + req.user.username);
        setTimeout(()=>{
            res.send('3 Sec response(Dummy Response to do create application here!!)');
        },3000);
    }             
});

app.get('/:appID',authenticateAccess,(req,res)=>{     
    console.log('Request of (' + res.locals.user.username + ') from IP:: ' + req.connection.remoteAddress + ' For app ::' + req.params.appID);   
    let page_param = {
        title: 'App Home',
        search_bar: false,
        navbar: true,
        sidebar: true,
        notification: true,
        help_button: true
    };
    res.render('index',page_param);
});

// Authentication Check
function authenticateAccess(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else {
        req.flash('danger','Please Login first');
        res.redirect('/users/login');
    }
}

// Users route for login and register 
let users = require("./routes/users")
app.use('/users',users)

// Server Listen on default port
app.listen(config.port,()=>{
    console.log('Server start on port :: '+config.port);
});