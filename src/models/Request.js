const { model, Schema } = require("mongoose");

const RequestSchema = new Schema(
  {
    case: { type: String, required: true },
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
    location: { type: String, required: true },
    helper: { type: Schema.Types.ObjectId, ref: "Helper" },
    status: { type: String, enum: ["close", "open"] },
  },
  { timestamps: true }
);

module.exports = model("Request", RequestSchema);
