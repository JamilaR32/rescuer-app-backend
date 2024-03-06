//\\ بسم الله الرحمن الرحيم //\\

const Helper = require("../../models/Helper");
const Request = require("../../models/Request");

const fetchRequest = async (request, response, next) => {
  try {
    const _id = request.params._id;
    const newRequest = await Request.findById(_id); // request name adjusted
    return response.status(200).json(newRequest);
  } catch (error) {
    next(error);
  }
};
//the created request should have an assigned user, and only a user can create a request
// const createTweet = async (req, res, next) => {
//   try {
//     req.body.user = req.user._id;
//     const tweet = await Tweet.create(req.body);
//     return res.status(201).json(tweet);
//   } catch (error) {
//     next(error);
//   }
// };
//
const getIfIHaveRequest = async (req, res, next) => {
  try {
    // find one req from me that is open

    const request = await Request.findOne({
      user: req.user._id,
      status: { $ne: "close" }, // $ne operator selects the documents where the value of the status field is not equal to "closed"
    })
      .populate({
        path: "helper",
        populate: {
          path: "user",
        },
      })
      .populate("user");

    return res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};
const createRequest = async (req, res, next) => {
  try {
    req.body.user = req.user._id; //"message": "Cannot read properties of undefined (reading '_id')"

    const newRequest = await Request.create(req.body);

    req.user.requests.push(newRequest._id);
    await req.user.save();
    // await req.user.updateOne({
    //   requests: { $push: newRequest._id },
    // });
    res.status(201).json(newRequest);
  } catch (error) {
    next(error);
  }
};
//the created request should have an assigned user, specificaly the current one^^^^^^^^^^^^

const deleteRequest = async (req, res, next) => {
  const { _id } = req.params;
  try {
    console.log(req.body);
    await Request.findByIdAndDelete({ _id }); //delete not remove however before deletion we should find a way to relocate
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const updateRequest = async (req, res, next) => {
  //if while updating the body of the request has status then set that new status in the request// work here closing status
  // if (req.body.status) {
  //   // await Request.findByIdAndUpdate(status,req.body)
  // }
  const { _id } = req.params; //og
  //

  try {
    const foundRequest = await Request.findById(_id); // typo // error here
    foundRequest.status = "close";
    await foundRequest.save();

    // await Request.findByIdAndUpdate(_id, req.body); //tryed foundRequest
    // return res.json(foundRequest);
    return res.status(200).json(foundRequest); //trying to return the request //workin here 204?? got it!
    // res.status(204).end();
  } catch (error) {
    next(error);
  }
};

//
//reupdateRequest friday work

const reupdateRequest = async (req, res, next) => {
  //if while updating the body of the request has status then set that new status in the request// work here closing status
  // if (req.body.status) {
  //   // await Request.findByIdAndUpdate(status,req.body)
  // }
  const { _id } = req.params; //og
  //

  try {
    const foundRequest = await Request.findById(_id); // typo // error here
    foundRequest.status = "open";
    foundRequest.helper = null;
    //here i need to clear the helper, in other words make it undefined
    await foundRequest.save();

    return res.status(200).json(foundRequest);
  } catch (error) {
    next(error);
  }
};
//reupdateRequest friday work

const getAllRequests = async (req, res, next) => {
  try {
    const requests = await Request.find()
      .populate({
        path: "helper",
        populate: {
          path: "user",
        },
      })
      .populate("user");
    return res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};
const updateRequestLocation = async (req, res, next) => {
  try {
    const requestId = req.params._id;

    //const userId = req.body.userId; // Assuming the client sends userId directly
    if (!requestId) {
      return res.status(400).send("User ID is required");
    }
    const request = await Request.findOneAndUpdate({ user: requestId });
    if (!request) {
      return res.status(404).send("Helper not found");
    }
    // console.log(helper);
    await request.updateOne({
      location: { type: "Point", coordinates: req.body.coordinates },
    });
    console.log(request);
    return res.status(204).end(); // Make sure to call end() as a function
  } catch (error) {
    next(error);
  }
};

const getUserDetailsByHelperId = async (req, res) => {
  try {
    const helperId = req.params._id;

    const helper = await Helper.findById(helperId).populate("user").exec();
    console.log(helper);
    if (!helper) {
      return res.status(404).send({ message: "Helper not found." });
    }

    // Assuming 'user' is populated, send back the user details
    res.status(200).send(helper.user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Server error while fetching user details." });
  }
};

const pastRequests = async (req, res, next) => {
  try {
    const history = await Request.find({ status: "close" })
      .populate({
        path: "helper",
        populate: {
          path: "user",
        },
      })
      .populate("user");
    return res.status(201).json(history);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllRequests,
  updateRequest,
  deleteRequest,
  createRequest,
  fetchRequest,
  pastRequests,
  updateRequestLocation,
  reupdateRequest,
  getIfIHaveRequest,
  getUserDetailsByHelperId,
};
