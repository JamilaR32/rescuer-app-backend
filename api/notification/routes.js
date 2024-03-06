const express = require("express");
const passport = require("passport");
const { updateToken, sendNotificationMsg } = require("./controllers");

const route = express.Router();

route.put(
  "/notification-token",
  passport.authenticate("jwt", { session: false }),
  updateToken
);

route.post("/send-notification", sendNotificationMsg);

module.exports = route;
