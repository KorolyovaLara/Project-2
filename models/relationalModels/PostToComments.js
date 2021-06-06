const { Model, DataTypes } = require("sequelize");
const PostComment = require("../Comment");
const sequelize = require("../config/connection");
const Post = require("../Post");

class PostToComments extends Model {}

PostToComments.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: "id",
      },
    },
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Comment,
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
