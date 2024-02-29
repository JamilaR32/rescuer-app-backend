//\\ بسم الله الرحمن الرحيم //\\

// your controller here
///
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Request = require("../../models/Request");
const Helper = require("../../models/Helper");
const { response } = require("express");
const { default: mongoose } = require("mongoose");

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
    //location:
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

///sign-in-
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
// //
// const updateRequest = async (req, res, next) => {
//   const { _id } = req.params;
//   try {
//     await Request.findByIdAndUpdate(_id, req.body);
//     res.status(204).end();

const findNearestRequestForHelper = async (req, res, next) => {
  try {
    // Directly access helperId without using await
    const helperId = req.user._id;
    console.log("Helper ID:", helperId);

    // Validate helperId before proceeding
    if (!mongoose.Types.ObjectId.isValid(helperId)) {
      return res.status(400).json({ message: "Invalid helper ID" });
    }

    // Proceed with finding the helper
    const { helper } = await User.findById(helperId).populate("helper");
    console.log("Helper:", helper);

    if (!helper) {
      return res.status(404).json({ message: "Helper not found" });
    }

    if (!helper.location || !helper.location.coordinates) {
      return res.status(404).json({ message: "Helper's location not set" });
    }

    const [longitude, latitude] = helper.location.coordinates;

    const results = await Request.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $minDistance: 0,
          $maxDistance: 100000, // Example: 100 kilometers
        },
      },
    });

    return res.json(results);
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};

const getHelperById = async (req, res, next) => {
  try {
    const helper = await Helper.findById(req.params._id);

    res.status(200).json(helper);
  } catch (error) {
    next(error);
  }
};
const updateHelperLocation = async (req, res, next) => {
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
    console.log(helper);
    await helper.updateOne({
      location: { type: "Point", coordinates: req.body.coordinates },
    });
    console.log(helper);
    return res.status(204).end(); // Make sure to call end() as a function
  } catch (error) {
    next(error);
  }
};

//to assign the request choosen by the helper to the helper after checking if the user is a helper
const assignRequest = async (req, res, next) => {
  ///from params take id here
  // const request = req.body.requestId;
  console.log("start assign");
  const { _id } = req.params; //typo
  const helper = await User.findById(req.user._id);
  console.log(helper); // console.log(helper);
  // console.log(req.user._id);
  try {
    console.log("hello ahmad");
    const foundRequest = await Request.findById(_id); // typo
    console.log("test", foundRequest);
    if (!foundRequest) {
      return res.status(404).json("REQUEST NOT FOUND!"); // checking if the request exists or not
    }
    console.log("helper", foundRequest.helper);
    if (foundRequest.helper) {
      return res.status(401).json("REQUEST ALREADY HAS HELPER!"); // checking if the request has been taken by a helper fix fix fix
    } else {
      foundRequest.helper = req.user._id;

      foundRequest.status = "ongoing";
      await foundRequest.save();
    }

    if (!foundRequest.helper) {
      foundRequest.status = "open";
    }

    //if request has helper >status ongoing>done
    //if request does not have a helper >status open>done
    //if request has helper that closed it >status closed, should this be in update
    //
    //check if it exists>done
    //check if it has a helper>
    //check if its status is closed>
    //check its status?>
    //console.log(helper);
    helper.requests.push(foundRequest);
    await helper.save();

    await foundRequest.save();
    // const req = await User._id;
    return res.json(foundRequest);
  } catch (error) {
    next(error);
  }
};

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
    console.log(helper);
    await helper.updateOne({
      location: { type: "Point", coordinates: req.body.coordinates },
    });
    console.log(helper);
    return res.status(204).end(); // Make sure to call end() as a function
  } catch (error) {
    next(error);
  }
};
//to assign the request choosen by the helper to the helper^^^^^^^^^^^^

module.exports = {
  register,
  login,
  getMyProfile,
  fetchUser,
  updateLocation,
  assignRequest,
  //findNearestRequest,
  findNearestRequestForHelper,
  getHelperById,
  updateHelperLocation,
};
