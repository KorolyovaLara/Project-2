const router = require("express").Router();

const Games = require("../../../models/Games");
const withAuth = require("../../auth/withAuth");

// find all games for theuser
router.get("/", withAuth, async (req, res) => {
  const { id } = req.params.id;
  if (!id) {
    res.status(404).json({ message: "Invalid id" });
    return;
  }
  const user = req.user;
  const games = await Games.findAll({ include });
});

module.exports = router;
