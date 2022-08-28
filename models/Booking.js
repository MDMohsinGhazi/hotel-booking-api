const { Schema, model, Types } = require("mongoose");

const bookingSchema = new Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    adults: {
      type: Number,
      required: true,
      default: 1,
    },
    children: {
      type: Number,
      required: true,
      default: 0,
    },
    roomCount: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["booked", "check-in", "check-out", "canceled"],
      default: "booked",
    },
    dates: [Date],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Booking", bookingSchema);
