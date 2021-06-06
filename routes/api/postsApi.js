const router = require("express").Router();
const { Posts, Users, Comments } = require("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");

// GET all posts
router.get("/", (req, res) => {
  console.log("======================");
  Posts.findAll({
    // Query configuration
    authorId: {
      attributes: ["id", "authorId", "title", "slug", "content", "createdAt"],
      // show latest news first
      order: [["createdAt", "DESC"]],
      // JOIN to the User table
      include: [
        // comment model -- attaches username to comment
        {
          model: Comments,
          attributes: ["id", "content", "postId", "userId", "createdAt"],
          include: {
            model: Users,
            attributes: ["username"],
          },
        },
        {
          model: Users,
          attributes: ["username"],
        },
      ],
    },
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single post by id
router.get("/:id", (req, res) => {
  Posts.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "createdAt"],
    include: [
      {
        model: Users,
        attributes: ["username"],
      },
      {
        model: Comments,
        attributes: ["id", "content", "postId", "userId", "createdAt"],
        include: {
          model: Users,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE a new post
router.post("/", withAuth, (req, res) => {
  Posts.create({
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    userId: req.session.userId,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE a post
router.put("/:id", withAuth, (req, res) => {
  Posts.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE A post
router.delete("/:id", withAuth, (req, res) => {
  Posts.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
