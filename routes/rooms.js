const express = require("express");
const {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/room");

const { verifyManager } = require("../middlewares/verifyToken");
const router = express.Router();

router.route("/:hotelId").get(getRooms).post(verifyManager, createRoom);
router.route("/:id").get(getRoom).put(verifyManager, updateRoom);

router.route("/:id/:hotelId").delete(verifyManager, deleteRoom);

module.exports = router;
