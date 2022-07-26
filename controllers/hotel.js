const Hotel = require("../models/Hotel");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc     Create hotel
// @route    POST api/hotels/
// @access   private to admin
exports.createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const hotel = await newHotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    next(error);
  }
};

// @desc     Get all hotels
// @route    GET api/hotels/
// @access   Public
exports.getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

// @desc     Get hotel by id
// @route    GET api/hotels/:id
// @access   Public
exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

// @desc     Update hotel
// @route    GET api/hotels/:id
// @access   Private to admin
exports.updateHotel = async (req, res) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

// @desc     Delet hotel by id
// @route    GET api/hotels/:id
// @access   Private to admin
exports.deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel has been deleted");
  } catch (error) {
    next(error);
  }
};
