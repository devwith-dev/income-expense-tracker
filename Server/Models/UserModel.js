const mongoose = require("mongoose");

// user schema

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    hasCreatedAccount: {
      type: Boolean,
      default: false,
    },
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accounts",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//model

const User = mongoose.model("users", userSchema);

module.exports = User;
