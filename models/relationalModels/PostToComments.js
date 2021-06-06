const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");
const Comments = require("../Comments");
const Posts = require("../Posts");

class PostToComments extends Model {}

PostToComments.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Posts,
        key: "id",
      },
    },
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Comments,
        key: "postId",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "PostToComments",
  }
);

module.exports = PostToComments;
