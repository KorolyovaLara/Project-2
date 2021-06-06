const router = require("express").Router();

router.get("/", (req, res) => {
  if (req.user) {
    // render the dashboard
  } else {
    // render the landing page
  }
});

router.get("/login", (req, res) => {
  if (req.user) {
    // render the dashboard
  } else {
    res.render("login", {});
  }
});

router.get("/register", (req, res) => {
  if (req.user) {
    // render the dashboard
  } else {
    res.render("register", {});
  }
});

router.get("/user/:username", (req, res) => {
  // get the information for that user
});

router.get("/games", (req, res) => {
  // return all the games in the system
});

module.exports = router;
