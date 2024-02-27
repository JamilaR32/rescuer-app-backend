const Request = require("../../models/Request");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
require("dotenv").config();
//
const assignuser = async (userId, next) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

//
//
const assigrequest = async (userId, next) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};
//
module.exports = { assignuser, assigrequest };
