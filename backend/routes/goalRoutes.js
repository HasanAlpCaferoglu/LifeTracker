const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

// router.get("/", getGoals);
// router.post("/", (req, res) => setGoal);
// instead of the above two line we can write single line since both use same endpoint
router.route('/').get(getGoals).post(setGoal)

// router.put("/:id", (req, res) => updateGoal);
// router.delete("/:id", (req, res) => deleteGoal);
// similarly we can write the aboe two line as a single line since they use same endpoint
router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports = router;
