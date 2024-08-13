const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const passwordSchema = new Schema({
  id: String,
  website: String,
  username: String,
  password: String
});
 const passwordModel = mongoose.model('passwordModel', passwordSchema);
 module.exports = passwordModel;