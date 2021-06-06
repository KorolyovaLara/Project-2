// Model imports
const Users = require("./Users");
const Games = require("./Games");
const GameCollection = require("./GameCollection");

// Model association imports
const GameCollectionToGames = require("./relationalModels/GameCollectionToGames");

// user to game collection
Users.hasOne(GameCollection);
GameCollection.hasOne(Users, {
  foreignKey: "userId",
});

// game to game collection
GameCollection.hasMany(Games, { through: GameCollectionToGames });
Games.belongsToMany(GameCollection, {
  through: GameCollectionToGames,
});
