const Post = require("../models/Post");

module.exports = (express, passport) => {
  const router = express.Router();

  router.get("/test", async (req, res) => {
    try {
      await Post.deleteMany({});
      res.json({ status: "SUCCESS" });
    } catch (err) {
      res.json({ status: "FAIL", error: err });
    }
  });

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

  router.put("/react", async (req, res) => {
    try {
      let response = await Post.findOneAndUpdate(
        { _id: req.body.thread },
        {
          $inc: {
            "reactions.heart": req.body.reaction == "heart" ? 1 : 0,
            "reactions.laughing": req.body.reaction == "laughing" ? 1 : 0,
            "reactions.wow": req.body.reaction == "wow" ? 1 : 0,
            "reactions.sad": req.body.reaction == "sad" ? 1 : 0,
            "reactions.angry": req.body.reaction == "angry" ? 1 : 0
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
    try {
      return await newPost.save();
    } catch (err) {
      throw err;
    }
  };

  router.get("/generate/:amount", async (req, res) => {
    let images = [
      "https://imgflip.com/s/meme/Futurama-Fry.jpg",
      "https://i.pinimg.com/originals/ef/7a/7b/ef7a7becf53291d5fdb98f6b984746cd.jpg",
      "https://memegenerator.net/img/images/16979754.jpg",
      "https://i.pinimg.com/originals/82/df/be/82dfbe471924442e5a681b0752a791c1.jpg",
      "https://i.pinimg.com/originals/2e/2c/97/2e2c97d37eebe5d9b4af2ea31c2c66fe.jpg",
      "https://imgflip.com/s/meme/Third-World-Skeptical-Kid.jpg",
      "https://i.imgflip.com/uoyja.jpg"
    ];
    let author = req.user._id;

    try {
      for (let i = 0; i < parseInt(req.params.amount); i++) {
        let randImage = images[Math.floor(Math.random() * images.length)];
        await createPost({ image: randImage, author });
      }
    } catch (err) {
      res.json({ status: "FAIL", error: err });
    }
    res.json({ status: "SUCCESS" });
  });

  return router;
};
