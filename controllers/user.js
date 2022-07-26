const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc     Get all users
// @route    GET api/users
// @access   Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// @desc     Get user by id
// @route    GET api/users/:id
// @access   Public
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// @desc     Update user
// @route    GET api/users/:id
// @access   Public
exports.updateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updateUser);
  } catch (error) {
    next(error);
  }
};

// @desc     Delet hotel by id
// @route    GET api/user/:id
// @access   Public
exports.deleteUser = async (req, res, next) => {
  try {
    const hotel = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (error) {
    next(error);
  }
};
