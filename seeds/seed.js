const sequelize = require('../config/connection');
// Seeded user data from separate file
const { User } = require('../models');
const userData = require('./userData.json');

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

  process.exit(0);
}