const router = require("express").Router();

const Games = require("../../../models/Games");
const withAuth = require("../../../utils/auth");

// find all games for the user
router.get("/", withAuth, async (req, res) => {});

router.post("/", withAuth, async (req, res) => {
  try {
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
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
