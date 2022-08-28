const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const ErrorResponse = require("../utils/ErrorResponse");

const { uploadToS3 } = require("../middlewares/s3");
const crypto = require("crypto");

exports.createRoom = async (req, res, next) => {
  const imgName = crypto.randomBytes(8).toString("hex");
  const { hid } = req.params;
  req.body.image = `https://tour-app.s3.ap-south-1.amazonaws.com/${imgName}`;
  req.body.hotel = hid;
  try {
    const result = await uploadToS3(req.file, imgName);
    const newRoom = new Room(req.body);
    try {
      const room = await newRoom.save();
      res.status(201).json(room);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

exports.getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

exports.getRoomByHotel = async (req, res, next) => {
  const { hid } = req.params;
  console.log(hid);
  try {
    const rooms = await Room.find({ hotel: hid });
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

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

exports.deleteRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Room.findByIdAndDelete(id);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
