const router = require("express").Router();
const gameRoutes = require("./gameRoutes");
const tagRoutes = require("./tagRoutes");

router.use("/games", gameRoutes);
router.use("/tags", tagRoutes);

module.exports = router;
