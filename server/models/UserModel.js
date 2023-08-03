const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: {
    type: String,
    require: true,
    minLength: 8,
  },
});

UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
