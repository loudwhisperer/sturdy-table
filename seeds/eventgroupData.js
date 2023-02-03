const { Eventgroup } = require('../models');

const data = [
  {},
];

const eventgroupData = () => Eventgroup.bulkCreate(data);

module.exports = eventgroupData;