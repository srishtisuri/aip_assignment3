const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
require("./config/passport.js")(passport);

//Database connection
mongoose
  .connect(require("./config/key").dbUrl, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

//Deprecation warning  
mongoose.set("useFindAndModify", false);

//Express Session Init
app.use(
  session({
    secret: "area51",
    resave: false,
    saveUninitialized: false
  })
);

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport Init
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/users", require("./routes/userRoutes")(express, passport));
app.use("/api/posts", require("./routes/postRoutes")(express, passport));

//Initialise Server
app.listen(port, () => {
  console.log(`Server is now running on Port ${port}`);
});
