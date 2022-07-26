const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(new ErrorResponse("You are not authenticated!", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(new ErrorResponse("Token is not valid", 403));
    req.user = user;
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(new ErrorResponse("You are not authenticated!", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(new ErrorResponse("Token is not valid", 403));

    if (user.id === req.params.id || user.role === "admin") {
      next();
    } else {
      return next(new ErrorResponse("you are not authorize", 403));
    }
  });
};

exports.verifyManager = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(new ErrorResponse("You are not authenticated!", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(new ErrorResponse("Token is not valid", 403));

    if (user.role === "admin" || user.role === "manager") {
      next();
    } else {
      return next(new ErrorResponse("you are not authorize", 403));
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(new ErrorResponse("You are not authenticated!", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(new ErrorResponse("Token is not valid", 403));

    if (user.role === "admin") {
      next();
    } else {
      return next(
        new ErrorResponse("you are not authorize, Contect to admin", 403)
      );
    }
  });
};
