//\\ بسم الله الرحمن الرحيم //\\

// your controller here
///
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const Request = require("../../models/Request");

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
// //
// const updateRequest = async (req, res, next) => {
//   const { _id } = req.params;
//   try {
//     await Request.findByIdAndUpdate(_id, req.body);
//     res.status(204).end();

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
//
//to assign the request choosen by the helper to the helper after checking if the user is a helper
const assignRequest = async (req, res, next) => {
  ///from params take id here
  // const request = req.body.requestId;
  const { _id } = req.params; //typo
  const helper = await User.findById(req.user._id);
  console.log(helper); // console.log(helper);
  // console.log(req.user._id);
  try {
    const foundRequest = await Request.findById(_id); // typo
    console.log("test", foundRequest);
    if (!foundRequest) {
      return res.status(404).json("REQUEST NOT FOUND!"); // checking if the request exists or not
    }
    if (foundRequest.helper) {
      foundRequest.status = "ongoing";
      return res.status(401).json("REQUEST ALREADY HAS HELPER!"); // checking if the request has been taken by a helper fix fix fix
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

    foundRequest.helper = req.user._id;
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
  findNearestRequest,
};
