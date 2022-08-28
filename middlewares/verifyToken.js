const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");

const verifyToken = (req, res, next) => {
  if (
    !req.headers["authorization"] &&
    req.headers["authorization"].startsWith("Bearer")
  ) {
    return next(new ErrorResponse("you are not authenticated", 403));
  }
  const [Bearer, token] = req.headers["authorization"].split(" ");

  if (token === null || Bearer !== "Bearer")
    return next(new ErrorResponse("Invalid Token", 403));

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(new ErrorResponse("Token is not valid", 403));
    req.user = user;
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      return next(new ErrorResponse("you are not authorize", 403));
    }
  });
};

exports.verifyManager = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "manager") {
      next();
    } else {
      return next(new ErrorResponse("you are not authorize", 403));
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return next(new ErrorResponse("you are not admin", 403));
    }
  });
};

exports.verifyToken = verifyToken;
