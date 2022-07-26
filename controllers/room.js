const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc     Create Rooms
// @route    POST api/h/
// @access   private to admin
exports.createRoom = async (req, res, next) => {
  const { hotelId } = req.params;
  const newRoom = new Room(req.body);
  try {
    const room = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room._id } });
      res.status(201).json(room);
    } catch (error) {
      room.remove();
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// @desc     Get all Rooms
// @route    GET api/dca/
// @access   Public
exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

// @desc     Get room by id
// @route    GET api/hotels/:id
// @access   Public
exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

// @desc     Update hotel
// @route    GET api/hotels/:id
// @access   Private to admin
exports.updateRoom = async (req, res) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updateRoom);
  } catch (error) {
    next(error);
  }
};

// @desc     Delet hotel by id
// @route    GET api/hotels/:id
// @access   Private to admin
exports.deleteRoom = async (req, res, next) => {
  const { hotelId, id } = req.params;
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: id } });
      res.status(200).json("room has been deleted");
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
