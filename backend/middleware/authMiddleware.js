const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get the token from the bearer header
      // syntax is ==> bearer token
      token = req.headers.authorization.split(" ")[1]; // give token

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // when we do verify, it will allow us to get the payload or that will decode it so that we can get the payload which is id
      // remember in userController, when we signed it we set the id

      // get user from the token
      // do not include the hashed password to the req.user ==> use select('-password')
      req.user = await User.findById(decoded.id).select("-password");

      next(); // go to next middleware
    } catch (error) {
      console.log(error);
      res.status(401); // 401 === Not Authorized
      throw new Error("Not authorized");
    }
  }

  // if there is no token at all;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
