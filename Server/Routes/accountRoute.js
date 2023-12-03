const express = require("express");
const {
  createAccountCtrl,
  fetchAllAccCtrl,
  fetchSingleAccCtrl,
  deleteAccCtrl,
  updateAccCtrl,
} = require("../Controllers/accountController");
const verifyJWT = require("../middlewares/verifyToken");
const accountRoute = express.Router();

//@POST
//Create Account Route
accountRoute.post("/", verifyJWT, createAccountCtrl);

//@GET
//Fetch Account Route
accountRoute.get("/:id", fetchSingleAccCtrl);

//@GET
//Fetch All Account Route
accountRoute.get("/", fetchAllAccCtrl);

//@DELETE
//Delete Account Route
accountRoute.delete("/:id", deleteAccCtrl);

//@PUT
//Update Account Route
accountRoute.put("/:id", updateAccCtrl);

module.exports = accountRoute;
