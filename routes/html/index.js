const Users = require("../../models/Users");
const Games = require("../../models/Games");
const sequelize = require("../../config/connection");
const { withAuth } = require("../../utils/auth");

const router = require("express").Router();

router.get("/", withAuth, async (req, res) => {
  const loggedIn = req.user;
  if (!!loggedIn) {
    // render the dashboard
    const fetchName = req.user.firstName;
    const fetchUsername = req.user.username;
    res.render("dashboard", { fetchName, fetchUsername, loggedIn });
  } else {
    // render the landing page
    res.render("landingpage");
  }
});

router.get("/landing", (req, res) => {
  res.render("landingpage");
});

router.get("/login", (req, res) => {
  const loggedIn = req.user;
  if (loggedIn) {
    // render the dashboard
    res.render("dashboard", { loggedIn });
  } else {
    res.render("login", {});
  }
});

router.get("/register", (req, res) => {
  const loggedIn = req.user;
  if (loggedIn) {
    // render the dashboard
    res.render("dashboard", { loggedIn });
  } else {
    res.render("register", {});
  }
});

router.get("/user/:username", async (req, res) => {
  const loggedIn = req.user;
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

  // userInfo contains info of user, whoose profile we want to display
  const userInfo = user.get({ plain: true });

  res.render("user-info", {
    games,
    404: false,
    userInfo,
    loggedIn,
  });
});

router.get("/games", async (req, res) => {
  try {
    const loggedIn = req.user;
    const gamesData = await Games.findAll();
    const games = gamesData.map((game) => ({
      ...game.get({ plain: true }),
      trailer: game.trailer.replace("watch?v=", "embed/"),
    }));
    res.render("games", { games, loggedIn });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/about-us", (req, res) => {
  const loggedIn = req.user;
  res.render("about-us", { loggedIn });
});

router.get("/logout", (req, res) => {
  const loggedIn = req.user;
  res.render("logout", { loggedIn });
});

router.get("*", (req, res) => {
  const loggedIn = req.user;
  res.render("404", { loggedIn });
});

module.exports = router;
