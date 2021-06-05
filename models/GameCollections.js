const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class GameCollections extends Model {}

GameCollections.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    gameId: {
      type: DataTypes.INTEGER,
      references: {
        model: "games",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "game_collections",
  }
);

module.exports = GameCollections;
