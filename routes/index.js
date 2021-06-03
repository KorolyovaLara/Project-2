const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("this is the root route");
});

module.exports = router;
