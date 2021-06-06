const router = require("express").Router();

const Games = require("../../models/Games");
const Users = require("../../models/Users");
const GameCollections = require("../../models/GameCollections");
const withAuth = require("../../utils/auth");

// find all collections
router.get("/", withAuth, async (req, res) => {
  try {
    const collectionsData = await GameCollections.findAll({
      include: [{ model: Users, Games }],
    });
    res.status(200).json(collectionsData);
  } catch (err) {
    res.status(500).json({ message: "Something went terribly wrong" });
  }
});

// find collection that belongs to a user
router.get("/:id", withAuth, async (req, res) => {
  try {
    const userCollection = await GameCollections.findByPk(req.params.id, {
      include: [{ model: Users }],
    });

    if (!userCollection) {
      res.status(404).json({ message: `User does not have a collection.` });
      return;
    }
    res.status(200).json(userCollection);
  } catch (err) {
    res.status(500).json({ message: "Something went terribly wrong" });
  }
});

// create a collection
router.post("/", withAuth, async (req, res) => {
  try {
    const user = req.user;
    try {
      const userCollection = await GameCollections.create({
        userId: req.body.userId,
      });
      res.status(200).json(userCollection);
    } catch (err) {
      res.status(400).json(err);
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// delete a collection
router.delete("/:id", async (req, res) => {
  try {
    const userCollection = await GameCollections.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userCollection) {
      res.status(404).json({ message: "No collection found with that id!" });
      return;
    }

    res.status(200).json(userCollection);
  } catch (err) {
    res.status(500).json({ message: "Something went terribly wrong" });
  }
});

module.exports = router;
