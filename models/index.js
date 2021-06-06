// Model imports
const Users = require("./Users");
const Games = require("./Games");
const GameCollection = require("./GameCollection");
const Post = require("./Post");
const Comment = require("./Comment");
const Tag = require("./Tag");

// Model association imports
const GameCollectionToGames = require("./relationalModels/GameCollectionToGames");
const PostToTags = require("./relationalModels/PostsToTags");
const PostToComments = require("./relationalModels/PostToComments");
const UserToPosts = require("./relationalModels/UserToPosts");

// user to game collection
Users.hasOne(GameCollection);
GameCollection.hasOne(Users, {
  foreignKey: "userId",
});

// game to game collection
GameCollection.hasMany(Games, { through: GameCollectionToGames });
Games.belongsToMany(GameCollection, {
  through: GameCollectionToGames,
});

// user to post
Users.hasMany(Post, { through: UserToPosts });
Post.belongsToMany(Users, {
  through: UserToPosts,
});

// user to comment
Users.hasMany(Comment);
Comment.belongsTo(Users, {
  foreignKey: "authorId",
});

// post to comment
Post.hasMany(Comment, { through: PostToComments });
Comment.belongsTo(Post, {
  through: PostToComments,
});

// post to tag
Post.hasMany(Tag, { through: PostToTags });
Tag.belongsToMany(Post, { through: PostToTags });
