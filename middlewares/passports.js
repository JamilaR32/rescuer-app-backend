//\\ بسم الله الرحمن الرحيم //\\

const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

const localStrategy = new LocalStrategy(
  {
    usernameField: "civilId", //default name is username field it was civilid
    passwordField: "password",
  },
  async (civilId, password, done) => {
    try {
      console.log("calling passport");
      const user = await User.findOne({ civilId: civilId });
      if (!user) {
        return done({ message: "username or password is wrong!" });
      }
      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        return done({ message: "username or password is wrong!" });
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRECT_KEY,
  },
  async (payload, done) => {
    try {
      const userId = payload._id;
      const user = await User.findById(userId);
      if (!user) return done({ message: "user not found!" });

      if (Date.now() / 1000 > payload.exp) {
        return done({ message: "Token expired!" });
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = { localStrategy, jwtStrategy };
