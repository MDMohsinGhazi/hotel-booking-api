const express = require("express");
const { verifyUser, verifyAdmin } = require("../middlewares/verifyToken");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(verifyAdmin, getUsers);
router
  .route("/:id")
  .get(verifyUser, getUser)
  .put(verifyUser, updateUser)
  .delete(verifyUser, deleteUser);

module.exports = router;
