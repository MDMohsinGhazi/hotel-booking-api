class ErrorResponse {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
  static badRequest(msg) {
    return new ErrorResponse(msg, 400);
  }

  static internal(msg) {
    return new ErrorResponse(msg, 500);
  }
}

module.exports = ErrorResponse;
