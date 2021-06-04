const router = require("express").Router();
const authRoutes = require("./auth");
const homeRoutes = require("./homeRoutes");

router.use("/auth", authRoutes);
router.use('/', homeRoutes);

module.exports = router;
