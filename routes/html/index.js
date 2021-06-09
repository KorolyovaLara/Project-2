const Users = require("../../models/Users");
const Games = require("../../models/Games");
const sequelize = require("../../config/connection");

const router = require("express").Router();

router.get("/", (req, res) => {
  const loggedIn = req.user;
  if (loggedIn) {
    // render the dashboard
    res.render("dashboard", { loggedIn });
  } else {
    // render the landing page
    res.render("landingpage");
  }
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

// get all games page
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
  // returns an about us page with some information on there
});

router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;
