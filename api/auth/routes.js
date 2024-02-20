const express = require("express");
const router = express.Router();
const { register } = require("./controllers");
const { login } = require("./controllers");
const { getMyProfile } = require("./controllers");
const passport = require("passport");

// router.param("postId", async (req, res, next, postId) => {
//   const post = await fetchPost(postId, next);
//   if (post) {
//     req.post = post;
//     next();
//   } else {
//     const err = new Error("Post Not Found");
//     err.status = 404;
//     next(err);
//   }
// });

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
