const router = require("express").Router();

const Games = require("../../../models/Games");

// find all games for the user
router.get("/", async (req, res) => {
  const { id } = req.params.id;
  if (!id) {
    res.status(404).json({ message: "Invalid id" });
    return;
  }
  const user = req.user;
  const games = await Games.findAll({ include });
});

router.post("/", async (req, res) => {
  const user = req.user;

  const { gameTitle } = req.body;

  try {
    const game = await Games.create({
      usersPlay: user.id,
      gameTitle: gameTitle,
    });

    res.json(game);
  } catch (e) {
    console.log(e);
    return res
      .status(409)
      .json({ message: `The title "${gameTitle}" already exists.` });
  }
});

module.exports = router;
