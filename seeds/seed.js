const sequelize = require('../config/connection');
// Seeded user data from separate file
const { User, Event, Eventgroup } = require('../models');
const userData = require('./userData.json');
const eventData = require('./eventData');

const seedDB = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // Seed user login data
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });
  console.log('\n----- USERS SEEDED -----\n');

  // Seed event data
  await eventData();
  console.log('\n----- EVENTS SEEDED -----\n');
  
  process.exit(0);
}

seedDB();