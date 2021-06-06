const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Post = require("../Post");
const Tag = require("../Tag");

class PostToTags extends Model {}

PostToTags.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: "id",
      },
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: "postId",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "PostToTags",
  }
);

module.exports = PostToTags;
