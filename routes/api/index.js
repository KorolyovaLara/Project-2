const router = require("express").Router();

const gameApi = require("./games");
const collectionApi = require("./collections");
const tagRoutes = require("./tagRoutes");
const postsApi = require("./postsApi");

router.use("/games", gameApi);
router.use("/collecions", collectionApi);
router.use("/tags", tagRoutes);
router.use("/posts", postsApi);

module.exports = router;
