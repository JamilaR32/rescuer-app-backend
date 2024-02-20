const Trip = require("../../models/Trip");

fetchTrip = async (request, response, next) => {
  try {
    const _id = request.params._id;
    const trip = await Trip.findById(_id);
    return response.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};

createTrip = async (req, res, next) => {
  try {
    // req.body.user = req.user._id
    if (req.file) {
      req.body.image = req.file.path.replace("\\", "/");
    }
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};

deleteTrip = async (req, res, next) => {
  const { _id } = req.params;
  try {
    console.log(req.body);
    await Trip.findByIdAndRemove({ _id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

updateTrip = async (req, res, next) => {
  const { _id } = req.params;
  try {
    await Trip.findByIdAndUpdate(_id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTrips,
  updateTrip,
  deleteTrip,
  createTrip,
  fetchTrip,
};
