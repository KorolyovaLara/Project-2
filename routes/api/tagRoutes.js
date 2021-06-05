const Tag = require("../../models/Tag");
const { Op } = require("sequelize");

const router = require("express").Router();

// create new tag
router.post("/", async (req, res) => {
  const { title,slug,content} = req.body;

  if (
    ![title,slug,content].every(
      (item) => item.trim() !== ""
    )
  ) {
    res.status(404).send({ message: "Invalid parameters" });
    return;
  }

  const tagTitleValidate = await Tag.findOne({
    where: { title },
  });

  if (tagTitleValidate) {
    res.status(404).json({ message: "A tag with this title already exists!" });
    return;
  }

  const newTag = await Tag.create({
    title,slug,content
  });

  res.json({ status: "success", user: newTag });
});

module.exports = router;
