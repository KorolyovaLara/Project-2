const router = require("express").Router();
const tagRoutes = require("./tagRoutes");
const gameApi = require("./gameApi");

router.use("/tags", tagRoutes);
router.use("/api/game", gameApi);

module.exports = router;
