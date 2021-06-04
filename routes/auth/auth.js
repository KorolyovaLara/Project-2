const Users = require("../../models/Users");
const { Op } = require("sequelize");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, username, email, password, intro } = req.body;

  if (
    ![firstName, lastName, username, email, password].every(
      (item) => item.trim() !== ""
    )
  ) {
    res.status(404).send({ message: "Invalid parameters" });
    return;
  }

  const emailUser = await Users.findOne({
    where: { email },
  });

  if (emailUser) {
    res.status(404).json({ message: "That email is already taken" });
    return;
  }

  const usernameEmail = await Users.findOne({
    where: { username },
  });

  if (usernameEmail) {
    res.status(404).json({ message: "That username is taken" });
    return;
  }

  const newUser = await Users.create({
    firstName,
    lastName,
    username,
    email,
    password,
    intro,
  });

  res.json({ status: "success", user: newUser });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (![email, password].every((item) => item.trim() !== "")) {
    res.status(404).send({ message: "Invalid parameters" });
    return;
  }

  const user = await Users.findOne({
    where: { email },
  });

  if (!user) {
    res.status(404).json({ message: "Invalid email or password" });
    return;
  }

  if (!(await user.checkPassword(password))) {
    res.status(404).json({ message: "Invalid email or password" });
    return;
  }

  res.json({ status: "success", user });
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      return;
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
