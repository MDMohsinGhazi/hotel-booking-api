const express = require("express");

const {
  createBooking,
  getBookigByUser,
  cancelBooking,
  getBookingStatus,
} = require("../controllers/booking");
const { verifyUser, verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/").post(verifyUser, createBooking);
router.route("/mybookings").get(verifyToken, getBookigByUser);
router.route("/status").get(getBookingStatus);

router.route("/:id").patch(verifyUser, cancelBooking);

module.exports = router;
