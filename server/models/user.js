const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    login: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    avatar: { type: String, default: "none" }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
