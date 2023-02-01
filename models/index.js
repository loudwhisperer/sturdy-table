//const {User, Event, Friend, EventGroup} = require('./models')
const User = require("./User");
const Event = require("./Event");
const Friend = require("./Friend");
const Eventgroup = require("./Eventgroup");


//Event Group Associations

Eventgroup.associate = () => {
  Eventgroup.belongsTo(User, {
    foreignKey: "id",
    targetKey: "id",
    as: "User",
  });
  Eventgroup.belongsTo(Event, {
    foreignKey: "id",
    targetKey: "id",
    as: "Event",
  });
};

Event.associate = () => {
  Event.belongsToMany(User, {
    as: "EventsForUsers",
    through: Eventgroup,
    foreignKey: "id",
  });
};

User.associate = () => {
  User.belongsToMany(Event, {
    as: "UsersForEvents",
    through: Eventgroup,
    foreignKey: "id",
  });
};

//Event Group Associations End

module.exports = { User, Event, Eventgroup };
