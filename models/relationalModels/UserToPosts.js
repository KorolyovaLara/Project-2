const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Post = require("../Post");
const Users = require("../Users");

class UserToPosts extends Model {}

UserToPosts.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: "authorId",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "UserToPosts",
  }
);

module.exports = UserToPosts;
