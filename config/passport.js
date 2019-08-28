const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  checkPassword = async (hash, clearTextPassword) => {
    return await bcrypt.compare(clearTextPassword, hash);
  };

  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, async (err, user) => {
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
