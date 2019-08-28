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

    for (let i = 0; i < parseInt(req.params.amount); i++) {
      let randImage = images[Math.floor(Math.random() * images.length)];
      await createPost({ image: randImage, author });
    }
    res.json({ success: true });
  });
  return router;
};
