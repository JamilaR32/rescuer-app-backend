//\\ بسم الله الرحمن الرحيم //\\

// your controller here
///
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Helper = require("../../models/Helper");
const { response } = require("express");
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
    if (req.file) {
      req.body.image = req.file.path;
      req.body.user = newUser._id;
      const helper = await Helper.create(req.body);
      await newUser.updateOne({ helper: helper });
    }

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

const findNearestRequest = async (req, res, next) => {
  //   const helper = await Helper.findOneAndUpdate({ user: userId });

  try {
    Helper.find({
      location: {
        $near: {
          $maxDistance: 1000,
          $geometry: {
            type: "Point",
            coordinates: [long, latt],
          },
        },
      },
    }).find((error, results) => {
      if (error) console.log(error);
      console.log(JSON.stringify(results, 0, 2));
    });
  } catch (error) {
    next(error);
  }
};
// const updateLocation = async (req, res, next) => {
//   try {
//     const user = req.user;
//     const helper = await Helper.findOne({ user: user._id });
//     if (!helper) {
//       return res.status(404).send("Helper not found");
//     }
//     await helper.updateOne({
//       location: { ...helper.location, coordinates: req.body.coordinates },
//     });
//     return res.status(204).end;
//   } catch (error) {
//     next(error);
//   }
// };

const updateLocation = async (req, res, next) => {
  try {
    const userId = req.user._id;

    //const userId = req.body.userId; // Assuming the client sends userId directly
    if (!userId) {
      return res.status(400).send("User ID is required");
    }
    const helper = await Helper.findOneAndUpdate({ user: userId });
    if (!helper) {
      return res.status(404).send("Helper not found");
    }
    await helper.updateOne({
      location: { type: "Point", coordinates: req.body.coordinates },
    });
    console.log(helper);
    return res.status(204).end(); // Make sure to call end() as a function
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMyProfile,
  fetchUser,
  updateLocation,
  findNearestRequest,
};

////
