const jwt = require("jsonwebtoken");
require("dotenv").config();

function createToken(userId) {
  return jwt.sign({ userId }, process.env.AUTH_TOKEN, { expiresIn: "7d" });
}

function decodeToken(res, token) {
  if (jwt.verify(token, process.env.AUTH_TOKEN)) {
    res.redirect("/login");
    return;
  }
  return jwt.decode(token, process.env.AUTH_TOKEN);
}

module.exports = {
  createToken,
  decodeToken,
};
