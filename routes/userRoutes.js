const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = (express, passport) => {
  const router = express.Router();

  // Local Functions
  sendError = (res, error) => {
    return res.json({ status: "FAIL", error });
  };

  sendSuccess = (res, data) => {
    return res.json({ status: "SUCCESS", data });
  };

  updateLastLoggedIn = async user => {
    return await User.findByIdAndUpdate(
      user._id,
      {
        $set: { lastLoggedIn: new Date().toISOString() }
      },
      { new: true }
    );
  };

  // Get all users
  router.get("/", async (req, res) => {
    try {
      let response = await User.find();
      sendSuccess(res, response);
    } catch (err) {
      sendError(res, err);
    }
  });

  // Create user
  router.post("/", async (req, res) => {
    try {
      // Check if username is unique
      let userExists =
        (await User.findOne({ username: req.body.user.username })) || false;

      if (!userExists) {
        let newUser = new User({
          ...req.body.user,
          password: await bcrypt.hash(req.body.user.password, 10),
          ips: req.ip
        });

        let response = await newUser.save();
        sendSuccess(res, response);
      } else {
        return sendError(res, "Username already exists");
      }
    } catch (err) {
      sendError(res, err);
    }
  });

  // Delete user
  router.delete("/", async (req, res) => {
    try {
      let response = await User.findByIdAndRemove(req.body._id);
      sendSuccess(res, response);
    } catch (err) {
      sendError(res, err);
    }
  });

  // Update user
  router.put("/", async (req, res) => {
    try {
      let response = await User.findByIdAndUpdate(
        req.body._id,
        {
          $set: {
            ...req.body.items
          }
        },
        { new: true }
      );
      sendSuccess(res, response);
    } catch (err) {
      sendError(res, err);
    }
  });

  // add user reaction
  router.put("/addReaction", async (req, res) => {
    try {
      let user = await User.findById(req.body._id);
      console.log(
        user.myReactions
          .map(reaction => reaction.postId)
          .includes(req.body.myReaction.postId)
      );
      if (
        user.myReactions
          .map(reaction => reaction.postId)
          .includes(req.body.myReaction.postId)
      ) {
        response = await user.updateOne(
          {
            $set: {
              "myReactions.$[reaction]": req.body.myReaction
            }
          },
          {
            arrayFilters: [{ "reaction.postId": req.body.myReaction.postId }]
          }
        );
      } else {
        response = await user.updateOne({
          $push: {
            myReactions: req.body.myReaction
          }
        });
      }
      sendSuccess(res, response);
    } catch (err) {
      sendError(res, err);
    }
  });

  // Login
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) return sendError(res, err);
      if (!user) return sendError(res, "Incorrect username or password");
      req.logIn(user, async err => {
        if (err) return sendError(res, err);
        let updatedUser = await updateLastLoggedIn(req.user);
        return sendSuccess(res, updatedUser);
      });
    })(req, res, next);
  });

  // Logout
  router.get("/logout", (req, res) => {
    try {
      req.logout();
      req.session.destroy();
      sendSuccess(res);
    } catch (e) {
      sendError(res, err);
    }
  });

  // Get session information - DEV ONLY
  router.get("/session", (req, res) => {
    res.json({
      sessionID: req.sessionID,
      user: req.user,
      cookies: req.cookies
    });
  });

  return router;
};
