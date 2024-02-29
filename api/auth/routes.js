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
//takes id from token
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
//takes id from token^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
/// register
router.post("/register", upload.single("image"), register);

///// login

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

router.get(
  "/user/profile",
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

//assign user to request
//accepts current user id and request id
//assign user to request^^^^^^^^^^^^^^^^^^^^^^

module.exports = router;
