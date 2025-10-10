
const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs')
const db = require("../models/dbController")

const user = db
// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//     const user = await db.findUser(username)
      
//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       }
//         const isValidPwd =  await bcrypt.compare(password, user.password);
      
//       if (!isValidPwd) {
//         return done(null, false, { message: "Incorrect password" });
//       }
//       return done(null, user);
//     } catch(err) {
//       return done(err);
//     }
//   })
// );

// passport.serializeUser((user, done) => {
//       console.log("serializeUser called with user:", user);
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     console.log("des tried!")
//   try {
//         const user = await db.findUserById(id);
//         done(null, user);
//   } catch(err) {
//     done(err);
//   } 
// });


//JWT strategy
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'cats';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {

    try {
      const user = await db.findUserById(jwt_payload.sub);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
         }
         catch(err){
          return done(err,false);
         }

    }));



module.exports = passport;