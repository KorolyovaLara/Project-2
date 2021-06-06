const { Users } = require("../models");

const usersDara = [
  {
    firstName: "Gamer001",
    lastName: "Tester",
    username: "gamebuddy001",
    email: "testEmail001@mail.com",
    password: "testPassword",
  },
  {
    firstName: "Gamer0012",
    lastName: "Tester",
    username: "gamebuddy0012",
    email: "testEmail0012@mail.com",
    password: "testPassword0012",
  },
  {
    firstName: "Gamer0012",
    lastName: "Tester",
    username: "gamebuddy0012",
    email: "testEmail0012@mail.com",
    password: "testPassword",
  },
  {
    firstName: "Gamer001",
    lastName: "Tester",
    username: "gamebuddy0013",
    email: "testEmail0013@mail.com",
    password: "testPassword",
  },
];

const seedUsers = () => Users.bulkCreate(usersDara);

module.exports = seedUsers;
