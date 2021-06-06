const router = require("express").Router();

const gameApi = require("./gameApi");
const postApi = require("./postsApi");
const tagApi = require("./tagApi");

router.use("/games", gameApi);
router.use("/posts", postApi);
router.use("/tags", tagApi);
module.exports = router;
