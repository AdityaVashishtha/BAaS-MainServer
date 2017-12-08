const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true        
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        require: true
    }
});

const User = module.exports = mongoose.model('User',UserSchema);