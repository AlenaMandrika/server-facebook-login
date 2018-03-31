const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findOrCreate')
const UserSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  username: {
    type: String
  },
  facebookId: String
})
UserSchema.plugin(findOrCreate)
module.exports = mongoose.model('User', UserSchema)
