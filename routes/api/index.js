const router = require("express").Router();
const gameApi = require("./games");

router.use("/api", gameApi);

module.exports = router;
