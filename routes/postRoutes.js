const Post = require("../models/Post");

module.exports = (express, passport) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    let response = {};
    try {
      response = await Post.find();
      res.json({ outcome: "Posts successfully fetched", data: response });
    } catch (err) {
      console.log("An error occurred: " + err);
      res.json({ outcome: "An error occurred", error: err });
    }
  });

  return router;
};
