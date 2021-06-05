const router = require("express").Router();

// import all routes
const authRoutes = require("./auth");
const apiRoutes = require("./api");

// root level routes
router.use("/auth", authRoutes);
router.use("/api",apiRoutes);

module.exports = router;
