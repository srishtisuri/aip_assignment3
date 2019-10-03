const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  image: { type: String, required: true },
  dateCreated: {
    type: Date,
    required: true,
    default: new Date().toISOString()
  },
  history: { type: Array, required: true, default: [] },
  comments: { type: [String], required: true, default: [] },
  report: {
    status: { type: Boolean, required: true, default: false },
    reasons: { type: Array, required: false },
    moderated: { type: Boolean, required: true, default: false }
  },
  reactions: {
    heart: { type: Array, required: true, default: [] },
    laughing: { type: Array, required: true, default: [] },
    wow: { type: Array, required: true, default: [] },
    sad: { type: Array, required: true, default: [] },
    angry: { type: Array, required: true, default: [] }
  },
  author: { type: String, required: false },
  isComment: { type: Boolean, required: true, default: false }
});

module.exports = Post = mongoose.model("post", postSchema);
