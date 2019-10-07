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

  populatePostsWithUserInfo = async posts => {
    for (let i = 0; i < posts.length; i++) {
      let responseUser = await User.findById(posts[i].author);
      if (responseUser) {
        posts[i]._doc["name"] = responseUser.name;
        posts[i]._doc["username"] = responseUser.username;
        posts[i]._doc["avatar"] = responseUser.avatar;
      }
    }
    return posts;
  };
  router.get("/postsWithUser", async (req, res) => {
    try {
      let posts = req.query.isComment
        ? await Post.find({ isComment: req.query.isComment })
        : await Post.find();

      posts = await populatePostsWithUserInfo(posts);

      // sort by whatever - largest to smallest
      let type = req.query.sortBy || "new";
      if (type == "new" || type == "old") {
        for (let j = 0; j < posts.length; j++) {
          for (let i = 0; i < posts.length - 1; i++) {
            let date1 = new Date(
              posts[i].history[posts[i].history.length - 1].dateModified
            );
            let date2 = new Date(
              posts[i + 1].history[posts[i + 1].history.length - 1].dateModified
            );
            // Check to see which way to sort it
            if (type == "new" ? date1 < date2 : date1 > date2) {
              let temp = posts[i];
              posts[i] = posts[i + 1];
              posts[i + 1] = temp;
            }
          }
        }
      } else {
        for (let j = 0; j < posts.length; j++) {
          for (let i = 0; i < posts.length - 1; i++) {
            if (
              posts[i].reactions[type].length <
              posts[i + 1].reactions[type].length
            ) {
              let temp = posts[i];
              posts[i] = posts[i + 1];
              posts[i + 1] = temp;
            }
          }
        }
      }
      res.json({
        status: "SUCCESS",
        data: posts.slice(0, req.query.limit || posts.length)
      });
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

  router.get("/myComments", setHeader, checkToken, async (req, res) => {
    const decodedToken = await decodeToken(req);
    try {
      let posts = await Post.find({
        isComment: true,
        author: decodedToken.id
      });
      posts = await populatePostsWithUserInfo(posts);

      res.json({ status: "SUCCESS", data: posts });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  router.get("/:thread/comments", async (req, res) => {
    try {
      let post = await Post.findOne({
        _id: req.params.thread
      });
      let response = [];
      for (let comment of post.comments) {
        response.push(
          await Post.findOne({
            _id: comment
          })
        );
      }
      // console.log(response);
      response = await populatePostsWithUserInfo(response);
      res.json({ status: "SUCCESS", data: response });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  router.get("/:thread/commentParent", async (req, res) => {
    try {
      let response = await Post.findOne({
        comments: req.params.thread
      });
      response = await populatePostsWithUserInfo([response]);
      res.json({ status: "SUCCESS", data: response[0] });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      let response = await Post.findById(req.params.id);
      response = await populatePostsWithUserInfo([response]);
      res.json({ status: "SUCCESS", data: response[0] });
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

      let awsImageUrl = await uploadToS3Bucket(
        "brogrammers-images",
        req.body.image,
        newPost._id
      );

      newPost.history.push({
        dateModified: new Date().toISOString(),
        image: awsImageUrl
      });
      newPost.image = awsImageUrl;
      newPost.author = decodedToken.id;
      newPost.isComment = req.body.thread != null;
      try {
        let response = await newPost.save();
        if (req.body.thread != null) {
          await Post.findOneAndUpdate(
            { _id: req.body.thread },
            {
              $push: {
                comments: newPost._id
              }
            }
          );
        }
        res.json({ status: "SUCCESS", data: response });
      } catch (err) {
        throw err;
      }
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  const uploadToS3Bucket = async (bucket, image, id) => {
    await s3
      .putObject({
        Bucket: bucket,
        ContentEncoding: "base64",
        ContentType: "image/jpeg",
        Body: (buf = Buffer.from(
          image.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        )),
        Key: `${id}.png`,
        ACL: "public-read"
      })
      .promise();

    let signedUrl = await s3.getSignedUrl("getObject", {
      Bucket: bucket,
      Key: `${id}.png`
    });

    return signedUrl.split("?")[0];
  };

  router.delete("/:id", async (req, res) => {
    try {
      let response = await Post.findByIdAndDelete(req.params.id);
      res.json({ status: "SUCCESS", data: response });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  router.put("/", async (req, res) => {
    try {
      let imageURL = "";
      if (req.body.image.search("base64") != -1) {
        imageURL = await uploadToS3Bucket(
          "brogrammers-images",
          req.body.image,
          req.body.thread
        );
      } else {
        imageURL = req.body.image;
      }

      let response = await Post.findOneAndUpdate(
        { _id: req.body.thread },
        {
          $set: {
            image: imageURL,
            "report.moderated": req.body.admin == true ? true : false
          },
          $push: {
            history: {
              dateModified: new Date().toISOString(),
              image: imageURL
            }
          }
        },
        { new: true }
      );
      response = await populatePostsWithUserInfo([response]);
      res.json({ status: "SUCCESS", data: response[0] });
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
      response = await populatePostsWithUserInfo([response]);
      res.json({ status: "SUCCESS", data: response[0] });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  userAlreadyReported = (userId, reasons) => {
    let reported = false;
    reasons.forEach(reason => {
      if (reason.user == userId) {
        // console.log("true");
        reported = true;
      }
    });
    return reported;
  };
  router.put("/report", setHeader, checkToken, async (req, res) => {
    const decodedToken = await decodeToken(req);
    try {
      let post = await Post.findById(req.body.postId);
      if (userAlreadyReported(decodedToken.id, post.report.reasons) == true) {
        res.json({
          status: "FAIL",
          error: "You have already reported this image!"
        });
      } else {
        let response = await Post.findOneAndUpdate(
          { _id: req.body.postId },
          {
            $set: { "report.status": true },
            $push: {
              "report.reasons": {
                reason: req.body.reason,
                user: decodedToken.id
              }
            }
          },
          { new: true }
        );
        res.json({ status: "SUCCESS", data: response });
      }
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

  return router;
};
