const Users = require('./Users');
const Games = require('./Games');
const GameCollection = require('./GameCollection');
const Post = require('./Post');
const Comment = require('./Comment');

Users.belongsToMany(Games, {
    // Define the third table needed to store the foreign keys
    through: {
      model: GameCollection,
      unique: false
    },
    // Define an alias for when data is retrieved
    as: 'user_games'
  });
  
Games.belongsToMany(Users, {
  // Define the third table needed to store the foreign keys
  through: {
    model: GameCollection,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'games_played_by_user'
});
  
User.hasMany(Post, {
  foreignKey: 'parentId',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'parentId',
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'postId',
});

Post.belongsToMany(Tag, {
  // Define the third table needed to store the foreign keys
  through: {
    model: PostTag,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'post_tag'
});

Tag.belongsToMany(Post, {
// Define the third table needed to store the foreign keys
through: {
  model: PostTag,
  unique: false
},
// Define an alias for when data is retrieved
as: 'tag_of_post'
});

module.exports = { User, Games , GameCollection , Post };
