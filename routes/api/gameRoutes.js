const Games = require("../../models/Games");
const { Op } = require("sequelize");

const router = require("express").Router();

// create new game
router.post("/", async (req, res) => {
  const { title } = req.body;

  if (title.trim() === "") {
    res.status(404).send({ message: "Invalid parameters" });
    return;
  }

  const gameWithTitle = await Games.findOne({
    where: { title },
  });

  if (gameWithTitle) {
    res
      .status(404)
      .json({ message: `A game with ${title} title already exists!` });
    return;
  }

  const newGame = await Games.create({
    title,
  });

  res.json({ status: "success", game: newGame });
});

module.exports = router;
