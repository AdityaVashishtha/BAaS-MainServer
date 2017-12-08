const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const session = require("express-session")
const expressValidator = require("express-validator")
const passport = require("passport")
const config = require("./config/config")
const db_config = require("./config/database")
const flash = require("connect-flash")
const app = express()

// Setting body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// Connection to database
mongoose.connect(db_config.database,{useMongoClient: true});
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

// Passport Initialization
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

// Setting global variable for user when logged in
app.get('*',(req, res, next)=>{
    res.locals.user =req.user || null;
    next();
});

// Set  :: Public folder as default static path
app.use(express.static(path.join(__dirname,'public')));

// Set :: View Engine Pug
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// Index Page default Route set
app.get('/',authenticateAccess,(req,res)=>{        
    res.render('index',{title:'Home'});
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