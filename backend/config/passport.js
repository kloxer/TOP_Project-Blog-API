
const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs')
const db = require("../models/dbController")

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
    const user = await db.loginUser(username)
      
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
