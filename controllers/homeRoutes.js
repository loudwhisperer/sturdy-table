// Import modules
const router = require('express').Router();
const { Event, User } = require('../models');

// GET for homepage
router.get('/', async (req, res) => {
  try {
    // Get event db data
    const eventData = await Event.findAll({
      // Use the below code to add columns from related tables
      // include: [{ model: Table, attributes: ['column name'] }]
      include: [{ model: User, as: "party_members" }],
    });
    const events = eventData.map((event) => event.get({ plain:true }));
    
    // Send handlebars page to user
    res.render("homepage", {
      events,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId
    });
  } 
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET for Login page
router.get('/login', async (req, res) => {
  try {
     res.render("login", {
       loggedIn: req.session.loggedIn,
     }); 
  }
    catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  

module.exports = router;