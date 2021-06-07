const router = require("express").Router();

const Games = require("../../models/Games");
const Users = require("../../models/Users");
const GameCollection = require("../../models/GameCollection");
const { withAuth } = require("../../utils/auth");

// find all games for the user
router.get("/:id", withAuth, async (req, res) => {});

// create a new game
router.post("/", withAuth, async (req, res) => {
  try {
    const user = req.user;

    const { title } = req.body;

    try {
      const game = await Games.create({
        usersPlay: user.id,
        title,
        description,
        trailer,
      });

      res.json(game);
    } catch (err) {
      console.log(err);
      return res
        .status(409)
        .json({ message: `The title "${title}" already exists.` });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
