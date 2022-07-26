const { Schema, model } = require("mongoose");

const roomSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Room", roomSchema);
