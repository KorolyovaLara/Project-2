const router = require("express").Router();

const UserGame = require("../../models/UserGame");
const Games = require("../../models/Games");
const Users = require("../../models/Users");
const { withAuth } = require("../../utils/auth");
const sequelize = require("../../config/connection");

// find all games for the user

/**
 * select * from games inner join user_game on games.id = user_game.gameid where user_game.userid = ""
 */

router.get("/", withAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    try {
      const games = await sequelize.query(
        `select g.title, g.trailer, g.description from games as g inner join user_game as ug on ug.game_id = g.id where ug.user_id = ${userId}`,
        { type: sequelize.QueryTypes.SELECT }
      );

      if (!games) {
        res.status(404).json({ message: "No games found for this user!" });
        return;
      }
      res.json(games);
    } catch (e) {
      return res.status(500).json({ message: "Unexpected Error!" });
    }
  } catch (e) {
    res.status(500).json({ message: "Unable to fetch User!" });
  }
});

// create a new game
router.post("/", withAuth, async (req, res) => {
  try {
    const user = req.user;

    const { title, trailer, description } = req.body;

    try {
      const game = await Games.create({
        title,
        description,
        trailer,
      });

      await UserGame.create({
        user_id: user.id,
        game_id: game.id,
      });

      res.json({ title, description, trailer });
    } catch (e) {
      return res
        .status(409)
        .json({ message: `The title "${title}" already exists.` });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// add game to user collection
router.post("/gameCollection", withAuth, async (req, res) => {
  try {
    const user = req.user;

    const { title } = req.body;

    try {
      const game = await Games.findOne({
        where: { title },
        type: sequelize.QueryTypes.SELECT,
      });

      await UserGame.create({
        user_id: user.id,
        game_id: game.id,
      });

      res.json({ title });
    } catch (e) {
      return res.status(409).json({ message: `Something went wrong` });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
