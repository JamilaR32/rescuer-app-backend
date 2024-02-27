//\\ بسم الله الرحمن الرحيم //\\

const passport = require("passport");
const {
  getAllRequests,
  createRequest,
  fetchRequest,
  deleteRequest,
  updateRequest,
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
module.exports = router;
