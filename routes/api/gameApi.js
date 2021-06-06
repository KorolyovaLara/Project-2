const router = require("express").Router();

const Games = require("../../models/Games");
const { withAuth } = require("../../utils/auth");

// find all games
router.get("/", withAuth, async (req, res) => {});

router.post("/", withAuth, async (req, res) => {
  try {
    const user = req.user;

    const { title } = req.body;

    try {
      const newGame = await Games.create({
        usersPlay: user.id,
        title,
      });

      res.json({ status: "success", game: newGame });
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
