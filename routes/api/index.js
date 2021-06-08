const router = require("express").Router();
const gameApi = require("./gameApi");

router.use("/games", gameApi);

module.exports = router;
