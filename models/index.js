const User = require('./User');
const Event = require('./Event');

User.hasMany(Event, {
  foreignKey: attending_id,
  foreignKey: host_id,
});

