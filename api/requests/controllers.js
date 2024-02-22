//\\ بسم الله الرحمن الرحيم //\\

const Request = require("../../models/Request");

const fetchRequest = async (request, response, next) => {
  try {
    const _id = request.params._id;
    const newRequest = await Request.findById(_id);
    return response.status(200).json(newRequest);
  } catch (error) {
    next(error);
  }
};

const createRequest = async (req, res, next) => {
  try {
    // req.body.user = req.user._id
    if (req.file) {
      req.body.image = req.file.path;
    }
    const newRequest = await Request.create(req.body);
    res.status(201).json(newRequest);
  } catch (error) {
    next(error);
  }
};

const deleteRequest = async (req, res, next) => {
  const { _id } = req.params;
  try {
    console.log(req.body);
    await Request.findByIdAndRemove({ _id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const updateRequest = async (req, res, next) => {
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

module.exports = {
  getAllRequests,
  updateRequest,
  deleteRequest,
  createRequest,
  fetchRequest,
};
