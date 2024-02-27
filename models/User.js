//\\ بسم الله الرحمن الرحيم //\\

const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  fullName: { type: String, required: false },
  civilId: { type: String, required: false },
  password: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  requests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
  helper: { type: Schema.Types.ObjectId, ref: "Helper" },
});

module.exports = model("User", UserSchema);
