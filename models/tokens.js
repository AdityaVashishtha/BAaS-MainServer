const mongoose = require('mongoose');

const RememberMe = mongoose.Schema({    
    token: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    }
});

const Token = module.exports = mongoose.model('RememberMe',RememberMe);