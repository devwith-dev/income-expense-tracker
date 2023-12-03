const express = require("express");
const {
  createTransactionCtlr,
  fetchAllTransactionsCtrl,
  fetchSingleTransactionCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
} = require("../Controllers/transactionController");
const verifyJWT = require("../middlewares/verifyToken");

const transactionRoute = express.Router();

//@POST
//Create New Transaction Route
transactionRoute.post("/", verifyJWT, createTransactionCtlr);

//@GET
//Fetch All Transactions Route
transactionRoute.get("/", fetchAllTransactionsCtrl);

//@GET
//Fetch Single Transaction Route
transactionRoute.get("/:id", fetchSingleTransactionCtrl);

//@DELETE
//Delete A Transaction Route
transactionRoute.delete("/:id", deleteTransactionCtrl);

//@PUT
//Update A Transaction Route
transactionRoute.put("/:id", updateTransactionCtrl);

module.exports = transactionRoute;
