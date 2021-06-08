const Users = require("../../models/Users");
const sequelize = require("../../config/connection");

const router = require("express").Router();

router.get("/", (req, res) => {
  if (req.user) {
    // render the dashboard
    res.render("dashboard");
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
  console.log("asdasdasd");
  const { username } = req.params;
  const user = await Users.findOne({ where: { username } });
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
  console.log(games);
  // get the information for that user
  res.render("user-info", { games, 404: false, username });
});

router.get("/games", (req, res) => {
  res.render("games", {});
});

router.get("/about-us", (req, res) => {
  // returns an about us page with some information on there
});

router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;
