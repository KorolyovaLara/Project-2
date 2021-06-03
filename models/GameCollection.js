const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class GameCollection extends Model {}

GameCollection.init(
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
        model: 'users',
        key: 'userId',
      },
    },
    gameId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'games',
        key: 'gameId',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'game_collection',
  }
);

module.exports = GameCollection;
