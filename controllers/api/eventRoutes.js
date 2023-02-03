const router = require("express").Router();
const { User, Event, Friend, Eventgroup } = require("../../models");

//frontend route that is expecting a res.render of a handlebars component 
router.get("/", async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [{ model: User, through: Eventgroup }],
    });
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
    try{
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'party_members'
          //through: Eventgroup,
        },
      ],
    });
    if (!eventData) {
      res.status(404).json({ message: "No Event Found By This Name" });
      return;
    }
    res.status(200).json(eventData);
} catch(err){
  res.status(500).json(err.message);
}
});

router.post("/", async (req, res) =>{
  try{
    const dbEventData = await Event.create(
      req.body
    );
    res.status(200).json(dbEventData);
  } catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})

router.post("/attending", async (req, res) => {
  try{
  const data = await Eventgroup.create(req.body)
  res.status(200).json(data);
  } catch(err){
    res.status(500).json(err.message);
  }
})

router.get("/event/:id", async (req, res) => {
  try{
  const eventData = await Eventgroup.findAll({where:{eventId: req.params.id} })
  res.status(200).json(eventData);
  } catch(err){
    res.status(500).json(err.message);
  }
})

router.delete("/:id", (req, res) => {
  Event.destroy({ where: { id: req.params.id } }).then((data) =>
    res.json(data)
  );
});

module.exports = router;