const mongoose = require('mongoose');

const AppSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    apps: [{
		name: {
			type:String,
			unique: true
		},
		port: Number
		}]
});

const App = module.exports = mongoose.model('App',AppSchema);