//\\ بسم الله الرحمن الرحيم //\\

const { model, Schema } = require("mongoose");

const RequestSchema = new Schema({
  case: { type: String, required: true },
  user: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  location: {
    type: { type: String },
    coordinates: [],
  },
  helper: { type: Schema.Types.ObjectId, ref: "Helper" },
  status: { type: Boolean, default: false },
});
RequestSchema.index({ location: "2dsphere" });

module.exports = model("Request", RequestSchema);

//Geolocation reference
//<field>: { type: <GeoJSON type> , coordinates: <coordinates> }
//Geolocation reference
//location: {
//  type: "Point",
//  coordinates: [-73.856077, 40.848447]
//}
