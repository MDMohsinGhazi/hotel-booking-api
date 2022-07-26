const express = require("express");
const {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotel");
const { verifyAdmin } = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/").post(verifyAdmin, createHotel).get(getHotels);
router
  .route("/:id")
  .get(getHotel)
  .put(verifyAdmin, updateHotel)
  .delete(verifyAdmin, deleteHotel);
module.exports = router;
