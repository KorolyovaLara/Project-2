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
  res.render("user-info");
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
