const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

module.exports = (express, passport, AWS) => {
  const router = express.Router();
  const s3 = new AWS.S3();

  const setHeader = (req, res, next) => {
    if (
      req.cookies &&
      Object.prototype.hasOwnProperty.call(req.cookies, "token")
    ) {
      // Copy the token without the quotes
      req.headers.authorization =
        "Bearer " + req.cookies.token.slice(0, req.cookies.token.length);
    }
    next();
  };

  //Check to make sure header is not undefined, if so, return Forbidden (403)
  const checkToken = async (req, res, next) => {
    const header = req.headers["authorization"];

    if (typeof header !== "undefined") {
      const bearer = header.split(" ");
      const token = bearer[1];
      await jwt.verify(token, "brogrammers");
      next();
    } else {
      sendError(res, "Invalid Token");
    }
  };

  const decodeToken = async req => {
    let token = req.headers["authorization"].split(" ")[1];
    return await jwt.verify(token, "brogrammers");
  };

  router.get("/deleteAll", async (req, res) => {
    try {
      await Post.deleteMany({});
      await emptyBucket("brogrammers-images");
      res.json({ status: "SUCCESS" });
    } catch (err) {
      res.json({ status: "FAIL", error: err });
    }
  });

  router.get("/postsByUserTest", async (req, res) => {
    try {
      let responsePosts = await Post.find();
      responsePosts.map(async post => {
        let responseUser = await User.findById(post.author);
        console.log(post.author);
        return {
          ...post,
          name: responseUser.name,
          username: responseUser.username,
          avatar: responseUser.avatar
        };
      });
      res.json({ status: "SUCCESS", data: responsePosts });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  router.get("/", async (req, res) => {
    try {
      let response = await Post.find({ isComment: { $ne: true } });
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

  // TODO: Clean this up
  router.post("/", setHeader, checkToken, async (req, res) => {
    const decodedToken = await decodeToken(req);

    try {
      let newPost = new Post();

      await s3
        .putObject({
          Bucket: "brogrammers-images",
          ContentEncoding: "base64",
          ContentType: "image/jpeg",
          Body: (buf = Buffer.from(
            req.body.image.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          )),
          Key: `${newPost._id}.png`,
          ACL: "public-read"
        })
        .promise();

      let signedUrl = await s3.getSignedUrl("getObject", {
        Bucket: "brogrammers-images",
        Key: `${newPost._id}.png`
      });

      let awsImageUrl = signedUrl.split("?")[0];

      newPost.history.push({
        dateModified: new Date().toISOString(),
        image: awsImageUrl
      });
      newPost.image = awsImageUrl;
      newPost.author = decodedToken.id;

      try {
        let response = await newPost.save();
        res.json({ status: "SUCCESS", data: response });
      } catch (err) {
        throw err;
      }
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
      req.body.isComment = true;
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

  router.put("/react", setHeader, checkToken, async (req, res) => {
    const decodedToken = await decodeToken(req);
    try {
      let response = null;
      if (req.body.reaction) {
        let push = null;
        switch (req.body.reaction) {
          case "heart":
            push = { "reactions.heart": decodedToken.id };
            break;
          case "laughing":
            push = { "reactions.laughing": decodedToken.id };
            break;
          case "wow":
            push = { "reactions.wow": decodedToken.id };
            break;
          case "sad":
            push = { "reactions.sad": decodedToken.id };
            break;
          case "angry":
            push = { "reactions.angry": decodedToken.id };
            break;
        }
        response = await Post.findByIdAndUpdate(
          req.body.thread,
          {
            $push: push
          },
          { new: true }
        );
      }
      if (req.body.oldReaction) {
        let pull = null;
        switch (req.body.oldReaction) {
          case "heart":
            pull = { "reactions.heart": decodedToken.id };
            break;
          case "laughing":
            pull = { "reactions.laughing": decodedToken.id };
            break;
          case "wow":
            pull = { "reactions.wow": decodedToken.id };
            break;
          case "sad":
            pull = { "reactions.sad": decodedToken.id };
            break;
          case "angry":
            pull = { "reactions.angry": decodedToken.id };
            break;
        }
        response = await Post.findByIdAndUpdate(
          req.body.thread,
          {
            $pull: pull
          },
          { new: true }
        );
      }
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

  // DEV ONLY - Empty bucket
  function emptyBucket(bucketName, callback) {
    var params = {
      Bucket: bucketName
    };

    s3.listObjects(params, function(err, data) {
      if (err) return callback(err);

      params = { Bucket: bucketName };
      params.Delete = { Objects: [] };

      data.Contents.forEach(function(content) {
        params.Delete.Objects.push({ Key: content.Key });
      });

      s3.deleteObjects(params, function(err, data) {
        if (err) sendError(res, err);
      });
    });
  }
  // router.get("/postsByUser", async (req, res) => {
  //   try {
  //     let response = await Post.find();
  //     res.json({ status: "SUCCESS", data: response });
  //   } catch (err) {
  //     console.log("FAIL: " + err);
  //     res.json({ status: "FAIL", error: err });
  //   }
  // });

  // router.get("/postsByUser/test2", (req, res) => {
  //   Post.aggregate([
  //     {
  //       $lookup: {
  //         from: "user", // collection name in db
  //         localField: "_id",
  //         foreignField: "student",
  //         as: "worksnapsTimeEntries"
  //       }
  //     }
  //   ]).exec(function(err, students) {
  //     // students contain WorksnapsTimeEntries
  //   });
  // });

  return router;
};
