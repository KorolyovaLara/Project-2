const router = require("express").Router();
const htmlRoutes = require("./html");

// import all routes
const authRoutes = require("./auth");

const api = require("./api");

// root level routes
router.use("/", authRoutes);
router.use("/", api);

// html routes
router.use("/", htmlRoutes);

module.exports = router;
