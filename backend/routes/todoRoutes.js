const express = require("express");
const { getTodos, setTodo, updateTodo, deleteTodo } = require("../controllers/todoController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


router.route("/").get(protect, getTodos).post(protect, setTodo);

router.route("/:id").put(protect, updateTodo).delete(protect, deleteTodo);

module.exports = router;