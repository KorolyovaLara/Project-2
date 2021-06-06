const router = require("express").Router();
const tagApi = require("./tagApi");
const gameApi = require("./gameApi");

router.use("/tags", tagApi);
router.use("/api/game", gameApi);

module.exports = router;
