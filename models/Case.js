const { model, Schema } = require("mongoose");

const SkillSchema = new Schema({
  name: { type: String, required: true },
  request: [{ type: Schema.Types.ObjectId, ref: "Helper" }],
});

module.exports = model("Skill", SkillSchema);
