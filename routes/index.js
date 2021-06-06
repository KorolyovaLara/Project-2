const router = require("express").Router();

// import all routes
const authRoutes = require("./auth");
const api = require("./api");

// root level routes
router.use("/", authRoutes);
router.use("/api", api);

module.exports = router;
