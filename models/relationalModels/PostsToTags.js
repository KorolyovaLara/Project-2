const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");
const Posts = require("../Posts");
const Tags = require("../Tags");

class PostToTags extends Model {}

PostToTags.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Posts,
        key: "id",
      },
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tags,
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
