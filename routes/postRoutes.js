const Post = require("../models/Post");

module.exports = (express, passport) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      let response = await Post.find();
      res.json({ status: "SUCCESS", data: response });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      let response = await Post.findById(req.params.id);
      res.json({ status: "SUCCESS", data: response });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  router.post("/", async (req, res) => {
    try {
      let response = await createPost(req.body);
      res.json({ status: "SUCCESS", data: response });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      let response = await Post.findByIdAndDelete(req.params.id);
      res.json({ status: "SUCCESS" });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  router.put("/", async (req, res) => {
    try {
      let response = await Post.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: { image: req.body.image },
          $push: {
            history: {
              dateModified: new Date().toISOString(),
              image: req.body.image
            }
          }
        },
        { new: true }
      );
      res.json({ status: "SUCCESS", data: response });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  router.post("/comment", async (req, res) => {
    try {
      let commentPost = await createPost(req.body);
      let response = await Post.findOneAndUpdate(
        { _id: req.body.thread },
        {
          $push: {
            comments: commentPost._id
          }
        },
        { new: true }
      );
      res.json({ status: "SUCCESS", data: response });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  router.put("/report", async (req, res) => {
    try {
      let response = await Post.findOneAndUpdate(
        { _id: req.body.thread },
        {
          $set: { "report.status": true },
          $push: {
            "report.reasons": req.body.reason
          }
        },
        { new: true }
      );
      res.json({ status: "SUCCESS", data: response });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  let createPost = async post => {
    let newPost = new Post(post);
    newPost.history.push({
      dateModified: new Date().toISOString(),
      image: post.image
    });
    return await newPost.save();
  };

  return router;
};
