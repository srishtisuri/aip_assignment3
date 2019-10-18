const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateCreated: {
    type: Date,
    required: true,
    default: new Date().toISOString()
  },
  lastLoggedIn: {
    type: Date,
    required: false,
    default: new Date().toISOString()
  },
  ips: { type: String, required: true },
  avatar: { type: String, required: false },
  role: { type: String, required: true, default: "member" },
  accountStatus: { type: String, required: true, default: "activated" }
});

module.exports = User = mongoose.model("user", userSchema);
