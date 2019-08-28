const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  image: { type: String, required: true },
  dateCreated: { type: Date, required: true, default: new Date().toISOString() },
  history: { type: Array, required: true },
  comments: { type: Array, required: true },
  report: {
    status: { type: Boolean, required: true, default: false },
    reasons: { type: Array, required: false },
    moderated: { type: Boolean, required: true, default: false }
  },
  author: { type: String, required: true }
});

module.exports = Post = mongoose.model("post", postSchema);
