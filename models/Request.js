//\\ بسم الله الرحمن الرحيم //\\

const { model, Schema } = require("mongoose");

const RequestSchema = new Schema({
  case: { type: String, required: true },
  user: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  location: { type: String, required: true },
  helper: { type: Schema.Types.ObjectId, ref: "Helper" },
});

module.exports = model("Request", RequestSchema);
