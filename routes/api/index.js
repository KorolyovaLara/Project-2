const router = require("express").Router();

// added by Tinku
const gameRoutes = require("./gameRoutes");
const tagRoutes = require("./tagRoutes");
router.use("/games", gameRoutes);
router.use("/tags", tagRoutes);
//

const gameApi = require("./games");

router.use("/api", gameApi);


module.exports = router;
