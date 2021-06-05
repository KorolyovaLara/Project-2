const router = require("express").Router();
const gameRoutes = require("./gameRoutes");

router.use("/games", gameRoutes);

module.exports = router;
