const User = require('./User');
const Event = require('./Event');
const Friend = require('./Friend');

User.hasMany(Event, {
  foreignKey: attending_id,
  foreignKey: host_id,
});

User.belongsToMany(models.User, {
  as: "friends",
  foreignKey: "user_id",
  through: Friend
});

User.belongsToMany(models.User, {
  as: "userFriends", 
  foreignKey: "friend_id", 
  through: Friend
});