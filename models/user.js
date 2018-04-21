/* Module Dependency */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* User Schema */
const UserSchema = new Schema({
  name: {type: String, trim: true},
  email: {type: String, trim: true, index: true},
  password: {type: String, trim: true}
});

/* Expose the Schema */
module.exports = mongoose.model('user', UserSchema);


var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://dbuser:dbpwd@ds229549.mlab.com:29549/upskill');

var db = mongoose.connection;

//The User Shema 
var UserSchema = mongoose.Schema({
	iunputName: {
		type: String,
		index: true
	},
	inputEmail: {
		type: String
	},
	inputPassword: {
		type: String
	}

})

var User = module.exports = mongoose.model('users', UserSchema);

module.exports.getUserById = function(id, callback){
	User.findById(id,callback);

}

module.exports.getUserByEmail = function(inputEmail, callback){
	var query = {inputEmail: inputEmail};
	User.findOne(query,callback);
}

module.exports.comparePassword = function(inputPassword, hash, callback){
	bcrypt.compare(inputPassword, hash, function(err, isMatch) {
		callback(null, isMatch);
	});
}


module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.inputPassword, salt, function(err, hash) {
    	newUser.inputPassword = hash;
        newUser.save(callback);
    });
});
}


