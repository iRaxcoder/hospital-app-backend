const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  google: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Number,
    default: 1,
  },
});

userSchema.method("toJSON", function () {
  const { __v, _id, ...rest } = this.toObject();
  return rest;
});

module.exports = model("User", userSchema);
