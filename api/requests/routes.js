//\\ بسم الله الرحمن الرحيم //\\

const passport = require("passport");
const {
  getAllRequests,
  createRequest,
  fetchRequest,
  deleteRequest,
  updateRequest,
  pastRequests,
  updateRequestLocation,
  reupdateRequest,

  getIfIHaveRequest,
  getUserDetailsByHelperId,
  // getIfIHaveRequest,
} = require("./controllers");
const express = require("express");
const { assignRequest } = require("../auth/controllers");
const router = express.Router();

router.get("/requests", getAllRequests);

// TOKEN JWT
router.post(
  "/requests",
  passport.authenticate("jwt", { session: false }),
  createRequest
);
router.get(
  "/requests/getIfIHaveRequest",
  passport.authenticate("jwt", { session: false }),
  getIfIHaveRequest
);

router.put(
  "/requests/:_id",
  passport.authenticate("jwt", { session: false }),
  assignRequest
);

router.delete("/requests/:_id", deleteRequest);

router.get("/requests/:_id", fetchRequest);

//assign request to user
//accepts current request id and user id
//assign request to user^^^^^^^^^^^^^^^^^^^^^^
router.get("/requests/history/close", pastRequests);
router.put(
  "/updateRequestLocation/:_id",
  //passport.authenticate("jwt", { session: false }),
  updateRequestLocation
);

//
router.put(
  "/requests/close/:_id",
  passport.authenticate("jwt", { session: false }),
  updateRequest
);

router.put(
  "/requests/open/:_id",
  passport.authenticate("jwt", { session: false }),

  reupdateRequest //this will set request status to open incase the helper doesn't fullfill assistance
  //
);

router.get("/getUserByHelperId/:_id", getUserDetailsByHelperId);

module.exports = router;
