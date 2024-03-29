//\\ بسم الله الرحمن الرحيم //\\

const { model, Schema } = require("mongoose");

const HelperSchema = new Schema({
  image: { type: String, required: true },
  skills: [String],
  plateNumber: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'

      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  },
  requests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
});
HelperSchema.index({ location: "2dsphere" });

module.exports = model("Helper", HelperSchema);

//Geolocation reference
//<field>: { type: <GeoJSON type> , coordinates: <coordinates> }
//Geolocation reference
//location: {
//  type: "Point",
//  coordinates: [-73.856077, 40.848447]
//}
