// Import modules
const router = require('express').Router();
const { Event } = require('../models');

// GET for homepage
router.get('/', async (req, res) => {
  try {
    // Get event db data
    const eventData = await Event.findAll({
      // Use the below code to add columns from related tables
      // include: [{ model: Table, attributes: ['column name'] }]
    });
    const events = eventData.map((event) => event.get({ plain:true }));
    
    // Send handlebars page to user
    res.render('homepage', { events });
  } 
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;