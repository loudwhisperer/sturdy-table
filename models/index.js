//const {User, Event, Friend, EventGroup} = require('./models')
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

//TODO: association that allows to join between user and event

User.belongsToMany(Event, {
  through: Eventgroup, as:'user_events',
  //foreignKey: "userId",
});

Event.belongsToMany(User, {
  through: Eventgroup, as:'party_members',
  //foreignKey: "eventId",
});



//Event Group Associations End

module.exports = { User, Event, Eventgroup };
