const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Routine = require("../models/routineModel");

// @desc GET routines
// @route GET /api/routines
// @access Private
const getRoutines = asyncHandler(async (req, res) => {
  // Because of the protect middleware, we can access user info form the req.user
  const routines = await Routine.find({ user: req.user.id }); // get all routines specific to a user from our database through mongoose.
  res.status(200).json(routines);
});

// @desc CREATE routine
// @route POST /api/routine
// @access private
const setRoutine = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const routine = await Routine.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(routine);
});

// @desc UPDATE routine
// @route UPDATE /api/routine/:id
// @access private
const updateRoutine = asyncHandler(async (req, res) => {
  const routine = await Routine.findById(req.params.id);

  if (!routine) {
    res.send(400);
    throw new Error("Routine not found");
  }

  if (!req.user) {
    res.send(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the user of the todo that will be updated
  if (routine.user.toString() !== req.user.id) {
    res.send(401);
    throw new Error("User not authorized");
  }

  const updatedRoutine = await Routine.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedRoutine);
});


// @desc DELETE routine
// @route DELETE /api/routine/:id
// @access private
const deleteRoutine = asyncHandler(async (req, res) => {
  const routine = await Routine.findById(req.params.id);

  if (!routine) {
    res.send(400);
    throw new Error("Routine not found");
  }

  if (!req.user) {
    res.send(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the user of the todo that will be deleted
  if (routine.user.toString() !== req.user.id) {
    res.send(401);
    throw new Error("User not authorized");
  }

  await routine.remove();

  res.status(200).json({id: req.params.id});
});

module.exports = {
    getRoutines,
    setRoutine,
    updateRoutine,
    deleteRoutine
}
