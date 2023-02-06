const User = require("./User");
const Event = require("./Event");
const Eventgroup = require("./Eventgroup");
//const Friend = require("./Friend");


//Associations

Event.belongsTo(User, {
  foreignKey: "host_id",
  onDelete: "CASCADE",
});

User.hasMany(Event, {
  foreignKey: "host_id",
  onDelete: "SET NULL",
});

User.belongsToMany(Event, {
  through: Eventgroup, as:'user_events',
});

Event.belongsToMany(User, {
  through: Eventgroup, as:'party_members',
});



//Event Group Associations End

module.exports = { User, Event, Eventgroup };
