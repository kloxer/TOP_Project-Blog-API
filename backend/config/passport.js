
const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs')
const db = require("../models/dbController")


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

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


module.exports = passport;