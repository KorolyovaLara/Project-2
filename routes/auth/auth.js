const Users = require("../../models/Users");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, username, email, password, intro } = req.body;

  // validate that its not empty
  if (
    ![firstName, lastName, username, email, password].every(
      (item) => item.trim() !== ""
    )
  )
    throw new Error("Invalid parameters");

  // check that the email isnt taken
  const user = await Users.findOne({ where: { email } });

  if (user) throw new Error("Email is already taken");

  const newUser = await Users.create({
    firstName,
    lastName,
    username,
    email,
    password,
    intro,
  });

  return { status: "success", user: newUser };
});

module.exports = router;
