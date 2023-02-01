const router = require("express").Router();
const { User, Event, Friend, Eventgroup } = require("../../models");

//frontend route that is expecting a res.render of a handlebars component 
router.get("/", async (req, res) => {
  try {
    const eventData = await Event.findAll();
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
    try{
    const eventData = await Event.findByPk(req.params.id, {
        include: [{model: Event, as: 'name'}]
    });
    if (!eventData) {
      res.status(404).json({ message: "No Event Found By This Name" });
      return;
    }
    res.status(200).json(eventData);
} catch(err){}
});

router.post("/", async (req, res) =>{
  try{
    const dbEventData = await Event.create({
      name: req.body.name,
      date: req.body.date,
      time_start: req.body.time_start,
      est_length: req.body.est_length,
      is_public: req.body.is_public,
      is_virtual: req.body.is_virtual,
      max_users: req.body.max_users,
      location: req.body.location,
      category: req.body.category,
      game_name: req.body.game_name,
      notes: req.body.notes,
    });
    res.status(200).json(dbEventData);
  } catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;