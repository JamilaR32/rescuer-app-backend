const { model, Schema } = require("mongoose");

const RequestSchema = new Schema({
  case: { type: String, required: true },
  user: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      // required: true,
    },
    coordinates: {
      type: [Number],
      // required: true,
    },
  },
  helper: { type: Schema.Types.ObjectId, ref: "Helper" },
  status: { type: String, enum: ["close", "open", "ongoing"], default: "open" },
});
RequestSchema.index({ location: "2dsphere" });

module.exports = model("Request", RequestSchema);
