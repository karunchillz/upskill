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

