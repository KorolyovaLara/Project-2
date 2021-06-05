const router = require("express").Router();
const gameApi = require("./gameApi");

router.use("/game", gameApi);

module.exports = router;
