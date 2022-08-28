const ErrorResponse = require("../utils/ErrorResponse");
const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorResponse) {
    return res.status(err.statusCode).json(err);
  }

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;
    return res.status(400).json(message);
  }
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyPattern)} is already taken`;
    return res.status(409).json(message);
  }

  if (err.name === "ValidationError") {
    const msg = err.message.split(":");

    return res.status(400).json(msg[msg.length - 1]);
  }

  res.status(500).json(err.message || "Somthing went wrong");
};

module.exports = errorHandler;
