const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");
const GameCollections = require("../GameCollections");
const Games = require("../Games");

class GameCollectionToGames extends Model {}

GameCollectionToGames.init(
  {
    gameCollectionId: {
      type: DataTypes.INTEGER,
      references: {
        model: GameCollections,
        key: "gameId",
      },
    },
    gameId: {
      type: DataTypes.INTEGER,
      references: {
        model: Games,
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "GameCollectionToGames",
  }
);

module.exports = GameCollectionToGames;
