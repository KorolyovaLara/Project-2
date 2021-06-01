const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Games extends Model {}

Games.init(
  {
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    game_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    users_playing: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'games',
  }
);

module.exports = Games;
