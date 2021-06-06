const { decodeToken, createToken } = require("../utils/jwtToken");
const Users = require("../models/Users");

const withAuth = async (req, res, next) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }

  next();
};

function setNewToken(req, res, next) {
  if (!req.user) {
    return next();
  }

  const token = createToken(req.user.id);
  res.cookie("auth_token_gg", token, {
    httpOnly: true,
  });
  return next();
}

// this function is here to get the user extracted if the cookie is there
async function getUserIfCookieExists(req, res, next) {
  if (!req.cookies.auth_token_gg) {
    return next();
  }

  const { auth_token_gg } = req.cookies;
  const { userId: id } = decodeToken(auth_token_gg) || { userId: null };

  if (!id) {
    next();
    return;
  }

  const user = await Users.findByPk(id);

  if (!user) {
    next();
    return;
  }

  req.user = user.get({ plain: true });
  return next();
}

module.exports = { withAuth, setNewToken, getUserIfCookieExists };
