const mongoose = require("mongoose");

const routineSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // need to add a reference because need to know which model does this object id pertain to and it will be User model
    },
    text: {
      type: String,
      required: [true, "Please add a routine"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Routine', routineSchema)
