const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config(); // allow us to create .env file and variavles in it
const { errorHandler } = require("./middleware/errorMiddleware.js");
const connectDB = require("./config/db.js");

connectDB();

const port = process.env.PORT || 5000;

const app = express();

// in order to use req.body data which are used in controllers have to add middleware
// in middleware use body parser for raw json
app.use(express.json());
// for url encoded
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes.js"));
app.use("/api/todos", require("./routes/todoRoutes"));
app.use("/api/routines", require("./routes/routineRoutes.js"))
app.use("/api/users", require("./routes/userRoutes.js"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build"))); // set static folder which is the build folder for react

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  ); // going to load index.html is in our static build folder
} else {
    app.get('/', (req, res) => {
        res.send("Please set to production")
    })
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
