const Users = require("./Users");
const Games = require("./Games");
const GameCollections = require("./GameCollections");
const Posts = require("./Posts");
const Comments = require("./Comments");
const Tags = require("./Tags");

Users.hasOne(GameCollections, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

GameCollections.belongsTo(Users, {
  foreignKey: "userId",
});

GameCollections.hasMany(Games, {
  foreignKey: "gameId",
  onDelete: "CASCADE",
});

Games.belongsToMany(GameCollections, {
  foreignKey: "gameId",
});

Users.hasMany(Posts, {
  foreignKey: "parentId",
  onDelete: "CASCADE",
});

Posts.belongsTo(Users, {
  foreignKey: "parentId",
});

Posts.hasMany(Comments, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

Comments.belongsTo(Posts, {
  foreignKey: "postId",
});

Posts.belongsToMany(Tags, {
  // Define the third table needed to store the foreign keys
  through: {
    model: PostTag,
    unique: false,
  },
  // Define an alias for when data is retrieved
  as: "post_tag",
});

Tags.belongsToMany(Posts, {
  // Define the third table needed to store the foreign keys
  through: {
    model: PostTag,
    unique: false,
  },
  // Define an alias for when data is retrieved
  as: "tag_of_post",
});

module.exports = { Users, Games, GameCollections, Posts, Comments, Tags };
