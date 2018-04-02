var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://dbuser:dbpwd@ds229549.mlab.com:29549/upskill');

var db = mongoose.connection;

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

var User = module.exports = mongoose.model('Users', UserSchema);

module.exports.getUserById = function(){
	User.findById(id,callback);

}

module.exports.getUerByEmail = function(inputEmail, callback){
	var query = {inputEmail: inputEmail};
	User.findone(query,callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
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


