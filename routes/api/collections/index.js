const router = require("express").Router();
const collectionApi = require("./collectionApi");

router.use("/collection", collectionApi);

module.exports = router;
