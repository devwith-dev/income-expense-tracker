const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
} = require("../Controllers/userController");
const verifyJWT = require("../middlewares/verifyToken");
const userRoute = express.Router();

//@POST
//Register Route
userRoute.post("/register", userRegisterCtrl);

//@POST
//Login Route
userRoute.post("/login", userLoginCtrl);

//@GET
//Profile Route
userRoute.get("/profile", verifyJWT, userProfileCtrl);

//@DELETE
//Delete Profile Route
userRoute.delete("/", verifyJWT ,  userDeleteCtrl);

//@PUT
//Update Profile Route
userRoute.put("/", verifyJWT, userUpdateCtrl);

module.exports = userRoute;
