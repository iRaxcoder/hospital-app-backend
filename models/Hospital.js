const { Schema, model } = require("mongoose");

const hospitalSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    createdBy: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "hospitals",
  }
);

hospitalSchema.method("toJSON", function () {
  const { __v, ...rest } = this.toObject();
  return rest;
});

module.exports = model("Hospital", hospitalSchema);
