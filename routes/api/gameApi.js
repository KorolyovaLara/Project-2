const router = require("express").Router();

const UserGame = require("../../models/UserGame");
const Games = require("../../models/Games");
const { withAuth } = require("../../utils/auth");
const Users = require("../../models/Users");

// find all games for the user

/**
 * select * from games inner join user_game on games.id = user_game.gameid where user_game.userid = ""
 */

router.get("/", async (req, res) => {
  console.log(req.user);
  try {
    const userId = req.user.id;
    try {
      const games = await Users.findAll({
        include: {
          model: UserGame,
          include: [Users, Games],
        },
      });

      if (!games) {
        res.status(404).json({ message: "No games found for this user!" });
        return;
      }
      res.json(games);
    } catch (e) {
      console.log(e);
      return res.status(409).json({ message: `The title already exists.` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const user = req.user;

    const { title } = req.body;

    try {
      const game = await Games.create({
        usersPlay: user.id,
        title,
      });

      res.json(game);
    } catch (e) {
      console.log(e);
      return res
        .status(409)
        .json({ message: `The title "${title}" already exists.` });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
