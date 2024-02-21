//\\ بسم الله الرحمن الرحيم //\\

const express = require("express");
const router = express.Router();
const { register } = require("./controllers");
const { login } = require("./controllers");
const { getMyProfile } = require("./controllers");
const passport = require("passport");

/// register
router.post("/register", register);

///// login

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getMyProfile
);

module.exports = router;
