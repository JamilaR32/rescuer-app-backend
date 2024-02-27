//\\ بسم الله الرحمن الرحيم //\\

const {
  getAllRequests,
  createRequest,
  fetchRequest,
  deleteRequest,
  updateRequest,
  pastRequests,
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
module.exports = router;
