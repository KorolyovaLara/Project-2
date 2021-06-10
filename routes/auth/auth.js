const Users = require("../../models/Users");
const { createToken } = require("../../utils/jwtToken");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
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

    const user = await Users.create({
      firstName,
      lastName,
      username,
      email,
      password,
      intro,
    });

    const { id } = user.get({ plain: true });

    const token = createToken(id);

    res.cookie("auth_token_gg", token, {
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      user: {
        firstName,
        lastName,
        username,
        email,
        intro,
      },
    });
  } catch (e) {
    if (e?.errors) {
      res.status(500).json(e.errors.map((err) => err.path));
      return;
    }
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
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

    const {
      firstName,
      lastName,
      username,
      email: userEmail,
      intro,
      id,
    } = user.get({
      plain: true,
    });

    const token = createToken(id);
    res.cookie("auth_token_gg", token, {
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      user: { firstName, lastName, username, email: userEmail, intro },
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.send("Logout successful");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
