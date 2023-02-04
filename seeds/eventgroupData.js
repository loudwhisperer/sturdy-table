const { Eventgroup } = require('../models');

const data = [
  {
    userId: 1,
    eventId: 1
  },
  {
    userId: 2,
    eventId: 1
  },
  {
    userId: 4,
    eventId: 1
  },
  {
    userId: 6,
    eventId: 1
  },
  {
    userId: 8,
    eventId: 1
  },
  {
    userId: 9,
    eventId: 1
  },
  {
    userId: 10,
    eventId: 1
  },
  {
    userId: 14,
    eventId: 1
  },
  {
    userId: 1,
    eventId: 2
  },
  {
    userId: 7,
    eventId: 2
  },
  {
    userId: 9,
    eventId: 2
  },
  {
    userId: 13,
    eventId: 2
  },
  {
    userId: 8,
    eventId: 2
  },
  {
    userId: 15,
    eventId: 3
  },
  {
    userId: 1,
    eventId: 3
  },
  {
    userId: 14,
    eventId: 3
  },
  {
    userId: 16,
    eventId: 3
  },
  {
    userId: 14,
    eventId: 4
  },
  {
    userId: 15,
    eventId: 4
  },
  {
    userId: 16,
    eventId: 4
  },
  {
    userId: 12,
    eventId: 4
  },
  {
    userId: 13,
    eventId: 5
  },
  {
    userId: 3,
    eventId: 5
  },
  {
    userId: 16,
    eventId: 5
  },
  {
    userId: 4,
    eventId: 5
  },
  {
    userId: 3,
    eventId: 5
  },
  {
    userId: 15,
    eventId: 6
  },
  {
    userId: 16,
    eventId: 6
  },
  {
    userId: 13,
    eventId: 6
  },
  {
    userId: 14,
    eventId: 7
  },
  {
    userId: 15,
    eventId: 7
  },
  {
    userId: 1,
    eventId: 7
  },
  {
    userId: 15,
    eventId: 8
  },
  {
    userId: 16,
    eventId: 8
  },
  {
    userId: 2,
    eventId: 10
  },
  {
    userId: 9,
    eventId: 11
  },
  {
    userId: 14,
    eventId: 11
  },
  {
    userId: 5,
    eventId: 11
  },
  {
    userId: 6,
    eventId: 11
  },
  {
    userId: 14,
    eventId: 13
  },
  {
    userId: 15,
    eventId: 13
  },
  {
    userId: 7,
    eventId: 13
  },
  {
    userId: 6,
    eventId: 14
  },
  {
    userId: 1,
    eventId: 14
  },
  {
    userId: 3,
    eventId: 15
  },
  {
    userId: 6,
    eventId: 16
  },
  {
    userId: 4,
    eventId: 17
  },
  {
    userId: 6,
    eventId: 18
  },
  {
    userId: 15,
    eventId: 19
  },
  {
    userId: 14,
    eventId: 20
  }
];

const eventgroupData = () => Eventgroup.bulkCreate(data);

module.exports = eventgroupData;