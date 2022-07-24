const asyncHandler = require("express-async-handler");

const Todo = require("../models/todoModel");
const User = require("../models/userModel");

// @desc GET todos
// @route GET /api/todos
// @access private
const getTodos = asyncHandler(async (req, res) => {
  // Because of the protect middleware, we can access user info form the req.user
  const todos = await Todo.find({ user: req.user.id }); // get all todos specific to a user from our database through mongoose.
  res.status(200).json(todos);
});

// @desc SET todo
// @route POST /api/todos
// @access Private
const setTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const todo = await Todo.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(todo);
});

// @desc UPDATE todo
// @route PUT /api/todos/:id
// @access Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo is not found");
  }

  // check user
  if (!req.user) {
    res.status(401); // not authorized
    throw new Error("User not found");
  }

  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Errror("User not authorized");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
});

// @desc DELETE todo
// @route DELETE /api/todos/:id
// @access private

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo is not found");
  }

  // check user
  if (!req.user) {
    res.status(401); // not authorized
    throw new Error("User not found");
  }

  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Errror("User not authorized");
  }

  await todo.remove();

  res.status(200).json({id: req.params.id})

});


module.exports = {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo
}