//\\ بسم الله الرحمن الرحيم //\\

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
const createRequest = async (req, res, next) => {
  try {
    req.body.user = req.user._id; //"message": "Cannot read properties of undefined (reading '_id')"

    if (req.file) {
      req.body.image = req.file.path;
    }
    const newRequest = await Request.create(req.body);

    // newRequest = await Request.put(req.body.user=);
    //assign the user that created the request to the request,here??
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
  const { _id } = req.params;
  try {
    await Request.findByIdAndUpdate(_id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getAllRequests = async (req, res, next) => {
  try {
    const requests = await Request.find();
    res.json(requests);
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

// fetching a user to view the requests picked

// const fetchUser = async (request, response, next) => {
//   try {
//     const _id = request.params._id;
//     const newRequest = await Request.findById(_id); // request name adjusted
//     return response.status(200).json(newRequest);
//   } catch (error) {
//     next(error);
//   }
// };

// fetching a user to view the requests picked

const pastRequests = async (req, res, next) => {
  try {
    const history = await Request.find({ status: "close" });
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
};
