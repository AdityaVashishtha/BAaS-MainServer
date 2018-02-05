const express = require('express');
const router = express.Router();
const http = require("http");
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

router.get('/ref/:appID',(req,res)=>{
    if(req.isAuthenticated) {
        let user = req.user;       
        setTimeout(()=>{
            console.log('TODO Authentication via 3000 or app home..');            
            let user = {
                username: req.user.username,
                password: req.user.password,
                isSuper: true
            }
            var post_data = JSON.stringify(user);
            let postOptions = {
                host: 'localhost',                                
                port: '4000',
                path: '/dashboard/authenticate',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Content-Length': Buffer.byteLength(post_data)
                },
                data: user
            };            
            let postReq = http.request(postOptions,(res)=>{
                res.setEncoding('utf8');
                res.on('data', function (body) {
                    console.log('Body: ' + body);
                });
            });
            postReq.on('error', function(e) {
                console.log('problem with request: ' + e.message);
            });
            postReq.write(post_data);
            postReq.end();
            res.redirect("http://localhost:4200/dashboard");            
        },1000);
    } else {
        res.status(401).send();
    }    
});

//BELOW THIS CLEANING IS NEED FOR OLD CODE .. 


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