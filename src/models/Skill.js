//\\ بسم الله الرحمن الرحيم //\\

const { model, Schema } = require("mongoose");

const SkillSchema = new Schema({
  name: { type: String, required: true },
  helper: [{ type: Schema.Types.ObjectId, ref: "Helper" }],
});

module.exports = model("Skill", SkillSchema);
