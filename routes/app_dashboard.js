const express = require('express');
const router = express.Router();

//This router is main router to appID

router.get('/',authenticateAccess,(req,res)=>{     
    console.log('Request of (' + res.locals.user.username + ') from IP:: ' + req.connection.remoteAddress + ' For app ::');   
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

//Shubham is Working on app-analytics
router.get('/analytics',(req,res)=>{
    let page_param = {
        
    };
    res.render('app_analytics',page_param);    
});

//Abhishek is Working on app-config
router.get('/config',(req,res)=>{
    let page_param = {
        
    };
    res.render('app_config',page_param);
});

//Aditya is Working on app-database/tables
router.get('/database',(req,res)=>{
    let page_param = {
        
    };
    res.render('app_database',page_param);
});

function authenticateAccess(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else {
        req.flash('danger','Please Login first');
        res.redirect('/users/login');
    }
}

module.exports = router;