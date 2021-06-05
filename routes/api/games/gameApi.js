const router = require("express").Router();
const Games = require("../../../models/Games");
const withAuth = require("../../../utils/auth");

// find all games
router.get("/", withAuth, async (req, res) => {});

router.post("/", withAuth, async (req, res) => {
  try {
    const user = req.user;

    const { gameTitle } = req.body;
    if (gameTitle.trim() === "") {
      res.status(404).send({ message: "Invalid parameters" });
      return;
    }

    try {
      const newGame = await Games.create({
        usersPlay: user.id,
        gameTitle: gameTitle,
      });

      res.json({ status: "success", game: newGame });
    } catch (err) {
      console.log(err);
      return res
        .status(409)
        .json({ message: `The title "${gameTitle}" already exists.` });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
