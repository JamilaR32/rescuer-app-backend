const express = require("express");
const router = express.Router();
const {
  fetchRequest,
  deleteRequest,
  updateRequest,
} = require("../requests/controllers");

const { fetchUser } = require("../auth/controllers");
const passport = require("passport");

router.put("/assignuser", assignuser);
router.put("/assigrequest", assigrequest);
