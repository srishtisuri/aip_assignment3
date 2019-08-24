const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  lastLoggedIn: { type: Date, required: true },
  avatar: { type: String, required: true },
  cookie: { type: String, required: true },
  sessionID: { type: String, required: true },
  posts: { type: Array, required: true },
  role: { type: String, required: true },
  accountStatus: { type: String, required: true }
});

module.exports = User = mongoose.model("user", userSchema);
