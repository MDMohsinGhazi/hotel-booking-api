const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const ErrorResponse = require("../utils/ErrorResponse");

const { uploadToS3 } = require("../middlewares/s3");
const crypto = require("crypto");

exports.createHotel = async (req, res, next) => {
  const imgName = crypto.randomBytes(8).toString("hex");
  try {
    const result = await uploadToS3(req.file, imgName);
    req.body.image = `https://tour-app.s3.ap-south-1.amazonaws.com/${imgName}`;
    const newHotel = new Hotel(req.body);
    const hotel = await newHotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    next(error);
  }
};

exports.getHotels = async (req, res, next) => {
  const {
    city,
    min = 1,
    max = Number.MAX_VALUE,
    limit = 10,
    page = 1,
    ...others
  } = req.query;
  const pageNum = (page - 1) * limit;
  try {
    const hotels = await Hotel.find({
      ...others,
      $text: { $search: city },
      cheapestPrice: { $gte: min, $lte: max },
    })
      .limit(limit)
      .skip(pageNum);

    const totalResults = await Hotel.find({
      ...others,
      $text: { $search: city },
      cheapestPrice: { $gte: min, $lte: max },
    }).countDocuments();

    res.status(200).json({ totalResults, hotels });
  } catch (error) {
    next(error);
  }
};

exports.getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

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

exports.deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};

exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const count = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    const result = cities.map((city, index) => ({ [city]: count[index] }));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getFeaturedProperty = async (req, res, next) => {
  const { limit = 4 } = req.query;
  try {
    const featuredProperty = await Hotel.find({ featured: true }).limit(limit);
    res.status(200).json(featuredProperty);
  } catch (error) {
    next(error);
  }
};

exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    const holidayHomeCount = await Hotel.countDocuments({
      type: "holidayHome",
    });

    const types = [
      {
        type: "hotel",
        count: hotelCount,
        img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      },
      {
        type: "apartment",
        count: apartmentCount,
        img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      },
      {
        type: "resort",
        count: resortCount,
        img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmVzb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
      {
        type: "villa",
        count: villaCount,
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      },
      {
        type: "cabin",
        count: cabinCount,
        img: "https://images.unsplash.com/photo-1548795179-8bfc5c1ebb24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fGNhYmlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
      {
        type: "holiday home",
        count: holidayHomeCount,
        img: "https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvbGlkYXklMjBob21lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
    ];

    res.status(200).json(types);
  } catch (error) {
    next(error);
  }
};
