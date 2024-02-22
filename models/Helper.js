//\\ بسم الله الرحمن الرحيم //\\

const { model, Schema } = require("mongoose");

const HelperSchema = new Schema({
  image: { type: String, required: true },
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  plateNumber: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  requests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
});

module.exports = model("Helper", HelperSchema);
