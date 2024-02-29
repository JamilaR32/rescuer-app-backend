//\\ بسم الله الرحمن الرحيم //\\

const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMyProfile,
  fetchUser,
  // findNearestRequest,
  getHelperById,
  updateHelperLocation,
  findNearestRequestForHelper,
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
  "/updateHelperLocation",
  passport.authenticate("jwt", { session: false }),
  updateHelperLocation
);
router.get(
  "/nearestRequest",
  passport.authenticate("jwt", { session: false }),
  findNearestRequestForHelper
);
router.get(
  "/helper",

  getHelperById
);

//assign user to request
//accepts current user id and request id
//assign user to request^^^^^^^^^^^^^^^^^^^^^^

module.exports = router;
