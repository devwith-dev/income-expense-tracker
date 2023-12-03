const mongoose = require("mongoose");

// account schema

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: [
        "Savings",
        "Education",
        "Invenstemt",
        "Checking",
        "Credit Card",
        "Building",
        "School",
        "Project",
        "Utilities",
        "Travel",
        "Personal",
        "Groceries",
        "Entertainment",
        "Loan",
        "Cash Flow",
        "Uncategorized",
      ],
      required: true,
    },
    initialBalance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transactions",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    note: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//model

const Account = mongoose.model("accounts", accountSchema);

module.exports = Account;
