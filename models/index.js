const Users = require("./Users");
const Games = require("./Games");
const UserGames = require("./UserGames");

Users.belongsToMany(Games, {
  // Define the third table needed to store the foreign keys
  through: {
    model: UserGames,
    unique: false,
  },
  // Define an alias for when data is retrieved
  as: "user_games",
});

Games.belongsToMany(Users, {
  // Define the third table needed to store the foreign keys
  through: {
    model: UserGames,
    unique: false,
  },
  // Define an alias for when data is retrieved
  as: "games_played_by_user",
});

module.exports = { User, Games, UserGames };
