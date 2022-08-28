const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const ErrorResponse = require("../utils/ErrorResponse");

exports.createBooking = async (req, res, next) => {
  const user = req.user.id;
  const { hotel, room, dates, count } = req.body;
  try {
    const roomInfo = await Room.findById(room);
    const amount = roomInfo.price * count.rooms * dates.length;

    const newbooking = new Booking({
      user,
      hotel,
      room,
      amount,
      adults: count.adults,
      children: count.children,
      roomCount: count.rooms,
      dates,
    });
    try {
      const booking = await newbooking.save();
      try {
        await Room.findByIdAndUpdate(room, {
          $push: { unavailableDates: [dates] },
        });
        res.status(201).json(booking);
      } catch (error) {
        booking.remove();
        next(error);
      }
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.getBookigByUser = async (req, res, next) => {
  const { id } = req.user;

  try {
    const bookings = await Booking.find({ user: id })
      .populate("room")
      .populate("hotel");
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

exports.cancelBooking = async (req, res, next) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByIdAndUpdate(id, { status: "canceled" });
    res.status(200).json("Booking has been canceled");
  } catch (error) {
    next(error);
  }
};

exports.getBookingStatus = async (req, res, next) => {
  const booking = new Booking();
  console.log(booking.schema.path("status").enumValues);
};
