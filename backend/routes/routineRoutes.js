const express = require("express");
const { getRoutines, setRoutine, updateRoutine, deleteRoutine } = require("../controllers/routineController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


router.route("/").get(protect, getRoutines).post(protect, setRoutine);

router.route("/:id").put(protect, updateRoutine).delete(protect, deleteRoutine);

module.exports = router;
