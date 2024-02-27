//\\ بسم الله الرحمن الرحيم //\\

const { model, Schema } = require("mongoose");

const CaseSchema = new Schema({
  name: { type: String, required: true },
  request: [{ type: Schema.Types.ObjectId, ref: "Helper" }],
});

module.exports = model("Case", CaseSchema);
