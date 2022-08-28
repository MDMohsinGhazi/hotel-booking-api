const express = require("express");
const router = express.Router();
const {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/room");

const { verifyManager } = require("../middlewares/verifyToken");
const { upload } = require("../middlewares/upload");

router
  .route("/:hId")
  .get(getRooms)
  .post(verifyManager, upload.single("image"), createRoom);
router
  .route("/:id")
  .get(getRoomById)
  .put(verifyManager, updateRoom)
  .delete(deleteRoom);

module.exports = router;
