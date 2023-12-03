const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const appError = require("../Utils/appErrors");
const generateToken = require("../Utils/generateToken");

const userRegisterCtrl = async (req, res, next) => {
  const { email, fullname, password } = req.body;
  try {
    //check if user exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appError("User Already Exists", 400));
    }
    //encrypt the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "Success",
      fullname: (await user).fullname,
      email: (await user).email,
      id: (await user)._id,
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

const userLoginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check if user exists
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appError("Invalid Login Credentials"), 400);
    }

    //validate password
    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      return next(appError("Invalid Login Credentials"), 400);
    }

    res.json({
      status: "Login Sucessful",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

const userProfileCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "accounts",
      populate: {
        path: "transactions",
      },
    });
    res.status(200).json({
      status: "success",
      profile: user,
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

const userDeleteCtrl = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

const userUpdateCtrl = async (req, res, next) => {
  try {
    //1.check if email already exists
    if (req.body.email) {
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound)
        return next(
          appError("Email Already Exists or you already have this email", 400)
        );
    }

    //2.check if the user is updating the password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //update the password feild
      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      //send the response to user
      return res.status(200).json({
        status: "Successfully Updated",
        data: user,
      });
    }

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });

    //send the response to user
    res.status(200).json({
      status: "Successfully Updated",
      data: user,
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

module.exports = {
  userDeleteCtrl,
  userLoginCtrl,
  userProfileCtrl,
  userRegisterCtrl,
  userUpdateCtrl,
};
