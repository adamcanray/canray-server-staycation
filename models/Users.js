const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/* Model/Schema */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})
/* End Model/Schema */

/* hash password before save */
userSchema.pre('save', async function(next){
  const user = this;
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8);
  }
})

/* Export Model */
module.exports = mongoose.model('Users',userSchema)