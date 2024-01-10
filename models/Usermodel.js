const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  file: { type:String },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Compare hashed password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  const matched = await bcrypt.compare(candidatePassword, this.password); // this method takes hash and the plain password to match according to the hash
  return matched;
};

const User = mongoose.model('User', userSchema);

module.exports = User;