const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middlewares/verifyToken");
const { upload } = require("../middlewares/upload");
const {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  getFeaturedProperty,
  countByCity,
  countByType,
} = require("../controllers/hotel");
const { createRoom, getRoomByHotel } = require("../controllers/room");

router
  .route("/")
  .post(verifyAdmin, upload.single("image"), createHotel)
  .get(getHotels);
router.route("/countByCity").get(countByCity);
router.route("/type").get(countByType);
router.route("/featured").get(getFeaturedProperty);
router
  .route("/:hid/rooms")
  .get(getRoomByHotel)
  .post(upload.single("image"), createRoom);
router
  .route("/:id")
  .get(getHotelById)
  .put(verifyAdmin, updateHotel)
  .delete(verifyAdmin, deleteHotel);

module.exports = router;
