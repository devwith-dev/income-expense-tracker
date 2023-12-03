const mongoose = require("mongoose");

//connect

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sampleuser:sampleuser123@sample-cluster.7zesgoj.mongodb.net/Income-Expense"
    );
    console.log("Database Connected Sucessfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

dbConnect();
