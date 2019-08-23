const LocalStrategy = require("passport-local").Strategy;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  checkPassword = (userPassword, password) => {
    return userPassword === password;
  };

  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!checkPassword(user.password, password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    })
  );
};
