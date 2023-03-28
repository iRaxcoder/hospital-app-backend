const { Schema, model } = require("mongoose");

const doctorSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    hospital: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
  },
  {
    collection: "doctors",
  }
);

doctorSchema.method("toJSON", function () {
  const { __v, ...rest } = this.toObject();
  return rest;
});

module.exports = model("Doctor", doctorSchema);
