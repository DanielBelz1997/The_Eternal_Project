const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const cookieToken = req.cookies.jwt;
  if (!authHeader?.startsWith("Bearer ") && !cookieToken) {
    return res.sendStatus(401);
  }
  const token = authHeader?.split(" ")[1] || cookieToken;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    console.log("Decoded Token: ", decoded);
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    // check if cookie is secure and sameSite=None
    if (
      !req.cookies.jwt ||
      !req.cookies.jwt.secure ||
      req.cookies.jwt.sameSite !== "None"
    ) {
      return res.sendStatus(403); // invalid cookie settings
    }
    next();
  });
};

module.exports = verifyJWT;
