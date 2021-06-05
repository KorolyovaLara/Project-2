const router = require("express").Router();

// added by Tinku
const gameRoutes = require("./gameRoutes");
const tagRoutes = require("./tagRoutes");
router.use("/games", gameRoutes);
router.use("/tags", tagRoutes);
//

const gameApi = require("./games");
const collectionApi = require("./collections");

router.use("/api", gameApi);
router.use("/api", collectionApi);


module.exports = router;
