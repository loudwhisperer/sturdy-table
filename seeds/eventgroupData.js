const { Eventgroup } = require('../models');

const eventgroupData = [
  {},
];

const seedEventgroup = () => Eventgroup.bulkCreate(eventgroupData);

module.exports = seedEventgroup;