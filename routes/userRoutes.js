const User = require("../models/User");
const bcrypt = require("bcrypt");

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
    const users = await User.find();
    let newUser;
    let exists = false;
    users.forEach(user => {
      if (user.username === req.body.user.username) {
        exists = true;
      }
    });

    // TODO: Error checking
    if (exists) {
      const hash = await bcrypt.hash(req.body.user.password, 10);
      newUser = new User({
        ...req.body.user,
        password: hash,
        ips: req.ip
      });
    } else {
      return res.json({ status: "FAIL", error: "Username already exists" });
    }

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

  // Update user
  router.put("/", async (req, res) => {
    console.log(req.body);
    let response = {};
    try {
      response = await User.findByIdAndUpdate(
        req.body._id,
        {
          $set: {
            ...req.body.items
          }
        },
        {
          new: true
        }
      );
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
        return res.json({
          status: "FAIL",
          error: "Incorrect username or password"
        });
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
