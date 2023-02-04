const { Eventgroup } = require('../models');

const data = [
  {
    approved: true,
    userId: 1,
    eventId: 1
  },
  {
    approved: true,
    userId: 2,
    eventId: 1
  },
  {
    approved: true,
    userId: 4,
    eventId: 1
  },
  {
    approved: true,
    userId: 6,
    eventId: 1
  },
  {
    approved: true,
    userId: 8,
    eventId: 1
  },
  {
    approved: true,
    userId: 9,
    eventId: 1
  },
  {
    approved: false,
    userId: 10,
    eventId: 1
  },
  {
    approved: false,
    userId: 14,
    eventId: 1
  },
  {
    approved: true,
    userId: 1,
    eventId: 2
  },
  {
    approved: true,
    userId: 7,
    eventId: 2
  },
  {
    approved: true,
    userId: 9,
    eventId: 2
  },
  {
    approved: true,
    userId: 13,
    eventId: 2
  },
  {
    approved: true,
    userId: 8,
    eventId: 2
  },
  {
    approved: true,
    userId: 15,
    eventId: 3
  },
  {
    approved: true,
    userId: 1,
    eventId: 3
  },
  {
    approved: true,
    userId: 14,
    eventId: 3
  },
  {
    approved: true,
    userId: 16,
    eventId: 3
  },
  {
    approved: false,
    userId: 14,
    eventId: 4
  },
  {
    approved: false,
    userId: 15,
    eventId: 4
  },
  {
    approved: false,
    userId: 16,
    eventId: 4
  },
  {
    approved: true,
    userId: 12,
    eventId: 4
  },
  {
    approved: true,
    userId: 13,
    eventId: 5
  },
  {
    approved: true,
    userId: 3,
    eventId: 5
  },
  {
    approved: true,
    userId: 16,
    eventId: 5
  },
  {
    approved: true,
    userId: 4,
    eventId: 5
  },
  {
    approved: true,
    userId: 1,
    eventId: 5
  },
  {
    approved: false,
    userId: 15,
    eventId: 6
  },
  {
    approved: false,
    userId: 16,
    eventId: 6
  },
  {
    approved: false,
    userId: 13,
    eventId: 6
  },
  {
    approved: false,
    userId: 14,
    eventId: 7
  },
  {
    approved: false,
    userId: 15,
    eventId: 7
  },
  {
    approved: true,
    userId: 1,
    eventId: 7
  },
  {
    approved: false,
    userId: 15,
    eventId: 8
  },
  {
    approved: false,
    userId: 16,
    eventId: 8
  },
  {
    approved: true,
    userId: 2,
    eventId: 10
  },
  {
    approved: true,
    userId: 9,
    eventId: 11
  },
  {
    approved: true,
    userId: 14,
    eventId: 11
  },
  {
    approved: true,
    userId: 5,
    eventId: 11
  },
  {
    approved: true,
    userId: 6,
    eventId: 11
  },
  {
    approved: true,
    userId: 14,
    eventId: 13
  },
  {
    approved: true,
    userId: 15,
    eventId: 13
  },
  {
    approved: true,
    userId: 7,
    eventId: 13
  },
  {
    approved: true,
    userId: 6,
    eventId: 14
  },
  {
    approved: true,
    userId: 1,
    eventId: 14
  },
  {
    approved: true,
    userId: 3,
    eventId: 15
  },
  {
    approved: true,
    userId: 6,
    eventId: 16
  },
  {
    approved: true,
    userId: 4,
    eventId: 17
  },
  {
    approved: true,
    userId: 6,
    eventId: 18
  },
  {
    approved: true,
    userId: 15,
    eventId: 19
  },
  {
    approved: true,
    userId: 14,
    eventId: 20
  }
];

const eventgroupData = () => Eventgroup.bulkCreate(data);

module.exports = eventgroupData;