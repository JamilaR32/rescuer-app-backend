//\\ بسم الله الرحمن الرحيم //\\

const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMyProfile,
  fetchUser,
  updateLocation,
  findNearestRequest,
} = require("./controllers");
const passport = require("passport");
const upload = require("../../middlewares/multer");

router.param("userId", async (req, res, next, userId) => {
  try {
    const foundUser = await fetchUser(userId);
    if (!foundUser) return next({ status: 404, message: "User not found" });
    req.foundUser = foundUser;
    next();
  } catch (error) {
    return next(error);
  }
});

/// register
router.post("/register", upload.single("image"), register);

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
router.put(
  "/updateLocation",
  passport.authenticate("jwt", { session: false }),
  updateLocation
);
router.get(
  "/nearestRequest",
  passport.authenticate("jwt", { session: false }),
  findNearestRequest
);

module.exports = router;
