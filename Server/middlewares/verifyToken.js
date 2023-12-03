const jwt = require("jsonwebtoken");
const appError = require("../Utils/appErrors");

const verifyJWT = (req, res, next) => {
  //getting headers from the request made from the client side
  const authHeader = req.headers.authorization || req.headers.Authorization;

  //checking the header's authenticity
  if (!authHeader?.startsWith("Bearer ")) {
    return next(appError("Unauthorized", 401));
  }
  //extracting the token from the header
  const token = authHeader.split(" ")[1];

  //verifying the token and storing the user in the request
  jwt.verify(token, "anykey", (err, decoded) => {
    if (err) return next(appError("Invalid/Expired Token", 403));
    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;
