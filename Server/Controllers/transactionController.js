const Account = require("../Models/AccountModel");
const Transaction = require("../Models/TransactionModel");
const User = require("../Models/UserModel");
const appError = require("../Utils/appErrors");

const createTransactionCtlr = async (req, res, next) => {
  const { name, amount, note, transactionType, account, category } = req.body;
  try {
    //1.Find user
    const userFound = await User.findById(req.user.id);
    if (!userFound) {
      return next(appError("User Not Found", 404));
    }
    //2. find the account
    const accountFound = await Account.findById(account);
    if (!accountFound) {
      return next(appError("Account Not Found", 404));
    }

    //3. create the transaction
    const transaction = await Transaction.create({
      amount,
      note,
      account,
      transactionType,
      category,
      name,
      createdBy: req.user.id,
    });

    //4. push the transaction to the account
    accountFound.transactions.push(transaction._id);

    //5. resave the account
    await accountFound.save();

    res.json({
      status: "Success",
      data: transaction,
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

const fetchAllTransactionsCtrl = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({});

    res.status(200).json({
      status: "Fetched Successfully",
      data: transactions,
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

const fetchSingleTransactionCtrl = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.status(200).json({ Status: "Fetched Successfully", data: transaction });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

const deleteTransactionCtrl = async (req, res, next) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Delete Successful",
      data: null,
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

const updateTransactionCtrl = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "Update Successful",
      data: transaction,
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

module.exports = {
  updateTransactionCtrl,
  deleteTransactionCtrl,
  fetchAllTransactionsCtrl,
  fetchSingleTransactionCtrl,
  createTransactionCtlr,
};
