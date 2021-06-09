const Users = require("../../models/Users");
const Games = require("../../models/Games");
const sequelize = require("../../config/connection");
const { withAuth } = require("../../utils/auth");

const router = require("express").Router();

router.get("/", withAuth, async (req, res) => {
  if (req.user) {
    // render the dashboard
    const fetchName = req.user.firstName;
    const fetchUsername = req.user.username;
    res.render("dashboard", { fetchName, fetchUsername });
  } else {
    // render the landing page
    res.render("landingpage");
  }
});

router.get("/landing", (req, res) => {
  res.render("landingpage");
});

router.get("/login", (req, res) => {
  if (req.user) {
    // render the dashboard
    res.render("dashboard", {});
  } else {
    res.render("login", {});
  }
});

router.get("/register", (req, res) => {
  if (req.user) {
    // render the dashboard
    res.render("dashboard", {});
  } else {
    res.render("register", {});
  }
});

router.get("/user/:username", async (req, res) => {
  const userLoggedIn = req.user;
  const { username } = req.params;
  const user = await Users.findOne({
    where: { username },
    type: sequelize.QueryTypes.SELECT,
  });
  if (!user) {
    res.render("user-info", {
      404: true,
      message: `Couldn't locate a user with the username: ${username}`,
    });
    return;
  }
  const games = await sequelize.query(
    `select g.title, g.trailer, g.description from games as g inner join user_game as ug on ug.game_id = g.id where ug.user_id = ${user.id}`,
    { type: sequelize.QueryTypes.SELECT }
  );
  const userInfo = user.get({ plain: true });
  // get the information for that user
  const loggedIn = userLoggedIn;
  res.render("user-info", {
    games,
    404: false,
    userInfo,
    userLoggedIn,
    loggedIn,
  });
});

router.get("/games", async (req, res) => {
  try {
    const gamesData = await Games.findAll();
    const games = gamesData.map((game) => ({
      ...game.get({ plain: true }),
      trailer: game.trailer.replace("watch?v=", "embed/"),
    }));
    res.render("games", { games });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/about-us", (req, res) => {
  res.render("about-us");
});

router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;
