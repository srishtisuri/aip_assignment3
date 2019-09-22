const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (express, passport, AWS) => {
  const router = express.Router();
  const s3 = new AWS.S3();

  // Local Functions
  sendError = (res, error) => {
    return res.json({ status: "FAIL", error });
  };

  sendSuccess = (res, data) => {
    return res.json({ status: "SUCCESS", data });
  };

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
      // await jwt.verify(token, "brogrammers");
      next();
    } else {
      sendError(res, "Invalid Token");
    }
  };

  const updateLastLoggedIn = async user => {
    return await User.findByIdAndUpdate(
      user._id,
      {
        $set: { lastLoggedIn: new Date().toISOString() }
      },
      { new: true }
    );
  };

  const decodeToken = async req => {
    let token = req.headers["authorization"].split(" ")[1];
    return await jwt.verify(token, "brogrammers");
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

  // Get current user
  router.get("/current", setHeader, checkToken, async (req, res) => {
    const decodedToken = await decodeToken(req);

    try {
      let response = await User.findById(decodedToken.id);
      if (response) {
        response.password = undefined;
        sendSuccess(res, response);
      } else {
        sendError(res);
      }
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

        let responseUser = await newUser.save();
        let token = await jwt.sign({ id: responseUser._id }, "brogrammers", {
          expiresIn: 604800
        });
        res.cookie("token", token);
        sendSuccess(res);
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

  // Login
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) return sendError(res, err);
      if (!user) return sendError(res, "Incorrect username or password");
      req.logIn(user, async err => {
        if (err) return sendError(res, err);
        let updatedUser = await updateLastLoggedIn(req.user);
        let token = await jwt.sign({ id: updatedUser._id }, "brogrammers", {
          expiresIn: 604800
        });
        res.cookie("token", token, { httpOnly: true });
        return sendSuccess(res);
      });
    })(req, res, next);
  });

  // Logout
  router.get("/logout", (req, res) => {
    try {
      req.logout();
      req.session.destroy();
      res.clearCookie("token");
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

  // Check authentication
  router.get("/auth", setHeader, checkToken, async (req, res) => {
    const decodedToken = await decodeToken(req);

    try {
      let response = await User.findById(decodedToken.id);
      if (response) {
        sendSuccess(res);
      } else {
        sendError(res);
      }
    } catch (err) {
      sendError(res, err);
    }
  });

  return router;
};
