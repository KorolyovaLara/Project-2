// Model imports
const Users = require("./Users");
const Games = require("./Games");
const GameCollections = require("./GameCollections");
const Posts = require("./Posts");
const Comments = require("./Comments");
const Tags = require("./Tags");

// Model association imports
const GameCollectionToGames = require("./relationalModels/GameCollectionToGames");
const PostToTags = require("./relationalModels/PostsToTags");
const PostToComments = require("./relationalModels/PostToComments");
const UserToPosts = require("./relationalModels/UserToPosts");

// user to game collection
Users.hasOne(GameCollections);
GameCollections.hasOne(Users, {
  foreignKey: "userId",
});

// game to game collection
GameCollections.hasMany(Games, { through: GameCollectionToGames });
Games.belongsToMany(GameCollections, {
  through: GameCollectionToGames,
});

// user to post
Users.hasMany(Posts, { through: UserToPosts });
Posts.belongsToMany(Users, {
  through: UserToPosts,
});

// user to comment
Users.hasMany(Comments);
Comments.belongsTo(Users, {
  foreignKey: "authorId",
});

// post to comment
Post.hasMany(Comments, { through: PostToComments });
Comments.belongsTo(Posts, {
  through: PostToComments,
});

// post to tag
Posts.hasMany(Tags, { through: PostToTags });
Tags.belongsToMany(Posts, { through: PostToTags });
