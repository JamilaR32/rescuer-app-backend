const {
  getAllTrips,
  createTrip,
  fetchTrip,
  deleteTrip,
  updateTrip,
} = require("./controllers");
const express = require("express");
const router = express.Router();

router.get("/trips", getAllTrips);

// TOKEN JWT
router.post("/trips", createTrip);

router.put("/trips/:_id", updateTrip);

router.delete("/trips/:_id", deleteTrip);

router.get("/trips/:_id", fetchTrip);

module.exports = router;
