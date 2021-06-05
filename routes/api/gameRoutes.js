const Games = require("../../models/Games");
const { Op } = require("sequelize");

const router = require("express").Router();

// create new game
router.post("/", async (req, res) => {
  const { gameTitle } = req.body;

  if (
    ![gameTitle].every(
      (item) => item.trim() !== ""
    )
  ) {
    res.status(404).send({ message: "Invalid parameters" });
    return;
  }

  const newGame = await Games.create({
    gameTitle
  });

  res.json({ status: "success", user: newGame });
});

module.exports = router;
