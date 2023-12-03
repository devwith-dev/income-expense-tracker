const Account = require("../Models/AccountModel");
const User = require("../Models/UserModel");
const appError = require("../Utils/appErrors");

const createAccountCtrl = async (req, res, next) => {
  const { name, initialBalance, accountType, note } = req.body;
  try {
    //1. Find the logged in user
    const userFound = await User.findById(req.user.id);
    if (!userFound) {
      return next(appError("User Not Found", 404));
    }
    //2. Create the account
    const account = await Account.create({
      name,
      initialBalance,
      accountType,
      note,
      createdBy: req.user.id,
    });

    //3. Push the account into users accounts field
    userFound.accounts.push(account._id);

    //4. resave the user
    await userFound.save();
    res.json({ status: "Success", data: account });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

const fetchSingleAccCtrl = async (req, res, next) => {
  try {
    //find the id from params
    const { id } = req.params;
    //find the account
    const account = await Account.findById(id).populate("transactions");

    res.json({
      status: "Success",
      data: account,
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

const fetchAllAccCtrl = async (req, res, next) => {
  try {
    const accounts = await Account.find({});
    res.json(accounts);
  } catch (error) {
    next(appError(error.message, 500));
  }
};

const deleteAccCtrl = async (req, res, next) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      data: null,
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

const updateAccCtrl = async (req, res, next) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: account,
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

module.exports = {
  createAccountCtrl,
  updateAccCtrl,
  deleteAccCtrl,
  fetchAllAccCtrl,
  fetchSingleAccCtrl,
};
