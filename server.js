const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const AWS = require("aws-sdk");
const awsCreds = require("./config/AWS");
require("./config/passport.js")(passport);

//Database connection
mongoose
  .connect(require("./config/mlabKey").dbUrl, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

//AWS setup
AWS.config.update({
  accessKeyId: awsCreds.accessKey,
  secretAccessKey: awsCreds.secretKey,
  region: awsCreds.region
});

//Deprecation warning
mongoose.set("useFindAndModify", false);

//Express Session Init
app.use(
  session({
    secret: "brogrammers",
    resave: false,
    saveUninitialized: false
  })
);

//Middleware
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(cookieParser());

//Passport Init
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/users", require("./routes/userRoutes")(express, passport, AWS));
app.use("/api/posts", require("./routes/postRoutes")(express, passport, AWS));

// Express only serves static assets in production
// if (process.env.NODE_ENV === "production") {
// Setup static files
app.use(express.static(path.join(__dirname, "client/dist/im-board")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/im-board/index.html"));
});
// }

//Initialise Server
app.listen(port, () => {
  console.log(`Server is now running on Port ${port}`);
});
