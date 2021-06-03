const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Games extends Model {}

Games.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    gameTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usersPlaying: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "games",
  }
);

module.exports = Games;
