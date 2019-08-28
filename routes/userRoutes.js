const User = require("../models/User");

module.exports = (express, passport) => {
  const router = express.Router();

  // Get all users
  router.get("/", async (req, res) => {
    let response = {};
    try {
      response = await User.find();
      res.json({ status: "SUCCESS", data: response });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  // Create user
  router.post("/", async (req, res) => {
    // TODO: Error checking
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      dateCreated: req.body.dateCreated,
      lastLoggedIn: req.body.lastLoggedIn,
      avatar: req.body.avatar,
      sessionID: req.sessionID,
      cookie: req.body.cookie,
      posts: req.body.posts,
      role: req.body.role,
      accountStatus: req.body.accountStatus
    });
    let response = {};
    try {
      response = await newUser.save();
      res.json({ status: "SUCCESS", data: response });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  // Delete user
  router.delete("/", async (req, res) => {
    let response = {};
    try {
      response = await User.findByIdAndRemove(req.body._id);
      res.json({ status: "SUCCESS", data: response });
    } catch (err) {
      console.log("FAIL: " + err);
      res.json({ status: "FAIL", error: err });
    }
  });

  // Login
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) {
        return res.json({ status: "FAIL", error: err });
      }
      if (!user) {
        return res.json({ status: "Incorrect username or password" });
      }
      req.logIn(user, err => {
        if (err) {
          return res.json({ status: "FAIL", error: err });
        }
        return res.json({
          status: "SUCCESS",
          user: user
        });
      });
    })(req, res, next);
  });

  // Logout
  router.get("/logout", (req, res) => {
    try {
      req.logout();
      req.session.destroy();
      res.json({ status: "SUCCESS" });
    } catch (e) {
      res.json({ status: "FAIL", error: err });
    }
  });

  router.get("/session", (req, res) => {
    res.json({
      sessionID: req.sessionID,
      user: req.user,
      cookies: req.cookies
    });
  });

  return router;
};
