
const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs')
const db = require("../models/dbController")


passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
    const user = await db.findUser(username)
      
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
        const isValidPwd =  await bcrypt.compare(password, user.password);
      
      if (!isValidPwd) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
      console.log("serializeUser called with user:", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("des tried!")
  try {
        const user = await db.findUserById(id);
        done(null, user);
  } catch(err) {
    done(err);
  } 
});

module.exports = passport;