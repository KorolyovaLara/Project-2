const router = require("express").Router();
const gameApi = require("./games");
const collectionApi = require("./collections");

router.use("/api", gameApi);
router.use("/api", collectionApi);

module.exports = router;
