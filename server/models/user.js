const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String,  unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    age: { type: Number, min: 1 },
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
