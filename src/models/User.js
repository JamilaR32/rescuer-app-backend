const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  fullName: { type: String, required: true },
  civilId: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  requests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
  helper: { type: Schema.Types.ObjectId, ref: "Helper" },
});

module.exports = model("User", UserSchema);
