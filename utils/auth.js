const { decodeToken } = require("../utils/jwtToken");
const Users = require("../models/Users");

const withAuth = async (req, res, next) => {
  if (!req.cookies.auth_token_gg) {
    res.redirect("/login");
    return;
  }

  const { auth_token_gg } = req.cookies;
  const { userId: id } = decodeToken(auth_token_gg) || { userId: null };

  if (!id) {
    res.redirect("/login");
    return;
  }

  const user = await Users.findByPk(id);

  if (!user) {
    res.redirect("/login");
    return;
  }

  req.user = user.get({ plain: true });
  next();
};

module.exports = withAuth;
