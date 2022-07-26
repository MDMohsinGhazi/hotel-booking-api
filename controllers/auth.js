const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc     user registration
// @route    POST api/auth/register
// @access   Public
exports.register = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json({ name: user.name });
  } catch (error) {
    next(error);
  }
};

// @desc     user login
// @route    POST api/auth/login
// @access   Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    // check user
    if (!user) return next(new ErrorResponse("User not found", 404));
    // validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return next(new ErrorResponse("Password is incorrect", 401));

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ name: user.name });
  } catch (error) {
    next(error);
  }
};
