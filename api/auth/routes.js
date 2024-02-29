//\\ بسم الله الرحمن الرحيم //\\

const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMyProfile,
  fetchUser,
  findNearestRequest,
  getHelperById,
  updateHelperLocation,
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
  updateHelperLocation
);
router.get(
  "/nearestRequest",
  //passport.authenticate("jwt", { session: false }),
  findNearestRequest
);
router.get(
  "/helper/:_id",

  getHelperById
);

module.exports = router;
