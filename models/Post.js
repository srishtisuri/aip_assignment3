const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  image: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  history: { type: Array, required: true },
  comments: { type: Array, required: true },
  reported: {
    status: { type: Boolean, required: true },
    reason: { type: String, required: true },
    moderated: { type: Boolean, required: true }
  },
  author: { type: String, required: true }
});

module.exports = Post = mongoose.model("post", postSchema);
