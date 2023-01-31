//const {User, Event, Friend, EventGroup} = require('./models')
const User = require('./User');
const Event = require('./Event');
const Friend = require('./Friend');
const eventGroup = require('./EventGroup')

// User.hasMany(Event, {
//   foreignKey: attending_id,
//   foreignKey: host_id,
// });

// User.belongsToMany(models.User, {
//   as: "friends",
//   foreignKey: "user_id",
//   through: Friend
// });

// User.belongsToMany(models.User, {
//   as: "userFriends", 
//   foreignKey: "friend_id", 
//   through: Friend
// });

// Friend.belongsTo(User, {
//   as: "user", 
//   foreignKey: "user_id", 
// });

// Friend.belongsTo(User, {
//   as: "userFriends", 
//   foreignKey: "friend_id", 
// });

Event.belongsTo(User);

module.exports = {User}