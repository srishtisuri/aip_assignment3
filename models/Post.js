const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  image: { type: String, required: true },
  dateCreated: {
    type: Date,
    required: true,
    default: new Date().toISOString()
  },
  history: { type: Array, required: true },
  comments: { type: Array, required: true },
  report: {
    status: { type: Boolean, required: true, default: false },
    reasons: { type: Array, required: false },
    moderated: { type: Boolean, required: true, default: false }
  },
  reactions: {
    heart: { type: Number, required: true, default: 0 },
    laughing: { type: Number, required: true, default: 0 },
    wow: { type: Number, required: true, default: 0 },
    sad: { type: Number, required: true, default: 0 },
    angry: { type: Number, required: true, default: 0 }
  },
  author: { type: String, required: false }
});

module.exports = Post = mongoose.model("post", postSchema);
