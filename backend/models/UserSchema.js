const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username cannot be blank']
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank']
  }
})

UserSchema.statics.findAndValidate = async function(username, password){
  const foundUser = await this.findOne({username});
  if(foundUser){
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid? foundUser: false
  }else{
    return false
  }
  
}

UserSchema.pre('save', async function(next){
  if (!this.isModified('password')) return next();//tell us is password modified
  this.password = await bcrypt.hash(this.password, 12);
  next();
})

//statics=> where we can define multiple methods that will be added to user class itseld, to the model, not to particular instance of user

module.exports = mongoose.model('User', UserSchema)