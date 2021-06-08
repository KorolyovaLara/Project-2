const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/connection");

class UserGame extends Model {}

UserGame.init(
  {
    user_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user_game",
  }
);

module.exports = UserGame;
