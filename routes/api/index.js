const router = require("express").Router();
const gameApi = require("./gameApi");

router.use("/api/game", gameApi);

module.exports = router;
