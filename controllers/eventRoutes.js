const router = require("express").Router();
const { User, Event, Friend, EventRoutes } = require("../models");

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

module.exports = router;