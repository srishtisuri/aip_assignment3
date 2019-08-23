const User = require("../models/User");

module.exports = (express, passport) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    let response = {};
    try {
      response = await User.find();
      res.json({
        outcome: "Users successfully fetched",
        data: response,
        sessID: req.sessionID
      });
    } catch (err) {
      console.log("An error occurred: " + err);
      res.json({ outcome: "An error occurred", error: err });
    }
  });

  //Create user
  router.post("/", async (req, res) => {
    //   TODO: Error checking
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      dateCreated: req.body.dateCreated,
      lastLoggedIn: req.body.lastLoggedIn,
      avatar: req.body.avatar,
      cookie: req.body.cookie,
      posts: req.body.posts,
      role: req.body.role,
      accountStatus: req.body.accountStatus
    });
    let response = {};
    try {
      response = await newUser.save();
      res.json({ outcome: "User successfully added", data: response });
    } catch (err) {
      console.log("An error occurred: " + err);
      res.json({ outcome: "An error occurred", error: err });
    }
  });

  //Delete user
  router.delete("/", async (req, res) => {
    let response = {};
    try {
      response = await User.findByIdAndRemove(req.body._id);
      res.json({ outcome: "User successfully removed", data: response });
    } catch (err) {
      console.log("An error occurred: " + err);
      res.json({ outcome: "An error occurred", error: err });
    }
  });

  //Login
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) {
        return res.json({ outcome: "An error occurred", error: err });
      }
      if (!user) {
        return res.json({ outcome: "Incorrect username or password" });
      }
      req.logIn(user, err => {
        if (err) {
          return res.json({ outcome: "An error occurred", error: err });
        }
        return res.json({
          outcome: "User successfully logged in",
          user: user
        });
      });
    })(req, res, next);
  });

  return router;
};
