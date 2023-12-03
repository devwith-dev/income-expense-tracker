const express = require("express");
const userRoute = require("./Routes/userRoute");
const accountRoute = require("./Routes/accountRoute");
const transactionRoute = require("./Routes/transactionRoute");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cors = require('cors');
const app = express();

//connect database
require("./Config/dbConnect");

//? Middlewares
app.use(express.json());
app.use(cors());

// users Route

app.use("/api/v1/users", userRoute);

// account route

app.use("/api/v1/accounts", accountRoute);

// transaction route

app.use("/api/v1/transactions", transactionRoute);

//? Error Handlers
app.use(globalErrorHandler);

//? Listen to the server
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
