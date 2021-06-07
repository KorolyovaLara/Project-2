// Model imports
const Users = require("./Users");
const Games = require("./Games");
const UserGame = require("./UserGame");

Users.belongsToMany(Games, { through: UserGame, foreignKey: "user_id" });
Games.belongsToMany(Users, { through: UserGame, foreignKey: "game_id" });
