const Games = require("../../models/Games");
const { Op } = require("sequelize");

const router = require("express").Router();

// create new game
router.post("/", async (req, res) => {
  const { gameTitle } = req.body;

  if ( gameTitle.trim() === "" ) {
    res.status(404).send({ message: "Invalid parameters" });
    return;
  }

  const gameTitleValidate = await Games.findOne({
    where: { gameTitle },
  });

  if (gameTitleValidate) {
    res.status(404).json({ message: `A game with ${gameTitle} title already exists!`});
    return;
  }

  const newGame = await Games.create({
    gameTitle
  });

  res.json({ status: "success", user: newGame });
});

module.exports = router;
