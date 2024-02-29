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
} = require("./controllers");
const express = require("express");
const router = express.Router();

router.get("/requests", getAllRequests);

// TOKEN JWT
router.post("/requests", createRequest);

router.put("/requests/:_id", updateRequest);

router.delete("/requests/:_id", deleteRequest);

router.get("/requests/:_id", fetchRequest);
router.get("/requests/history/close", pastRequests);
router.put(
  "/updateRequestLocation/:_id",
  //passport.authenticate("jwt", { session: false }),
  updateRequestLocation
);
module.exports = router;
