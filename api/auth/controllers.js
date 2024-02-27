//\\ بسم الله الرحمن الرحيم //\\

// your controller here
///
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
require("dotenv").config();

const fetchUser = async (userId, next) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

////

///////hashPass

const hashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

///////generateToken

const generateToken = (user) => {
  const payLoad = {
    _id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payLoad, process.env.SECRET_KEY, {
    expiresIn: "350d",
  });
  return token;
};

///sign-up

const register = async (req, res, next) => {
  try {
    const password = req.body.password;
    const hashedPassword = await hashPassword(password);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body); // user
    const token = generateToken(newUser);

    res.status(201).json({ token: token });
  } catch (err) {
    next(err);
  }
};

///sign-in
const login = async (req, res, next) => {
  // console.log("first");
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
const getMyProfile = async (req, res, next) => {
  try {
    const oldUser = await User.findById({ _id: req.user._id });
    return res.status(200).json(oldUser);
  } catch (error) {
    next(error);
  }
};
module.exports = { register, login, getMyProfile, fetchUser };

////
