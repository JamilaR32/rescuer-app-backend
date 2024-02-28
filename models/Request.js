const { model, Schema } = require("mongoose");

const RequestSchema = new Schema(
  {
    case: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    location: {
      type: { type: String },
      coordinates: [],
    },
    helper: { type: Schema.Types.ObjectId, ref: "Helper" },
    status: {
      type: String,
      enum: ["close", "open", "ongoing"],
      default: "open",
    },
  },
  { timestamps: true }
);

RequestSchema.index({ location: "2dsphere" });

module.exports = model("Request", RequestSchema);
