const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

// router.get("/", getGoals);
// router.post("/", (req, res) => setGoal);
// instead of the above two line we can write single line since both use same endpoint
router.route("/").get(protect, getGoals).post(protect,setGoal);

// router.put("/:id", (req, res) => updateGoal);
// router.delete("/:id", (req, res) => deleteGoal);
// similarly we can write the aboe two line as a single line since they use same endpoint
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
