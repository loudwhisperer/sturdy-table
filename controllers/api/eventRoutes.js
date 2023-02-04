const router = require("express").Router();
const { User, Event, Friend, Eventgroup } = require("../../models");

//frontend route that is expecting a res.render of a handlebars component 

//get al events
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

// get an event with all fields and all users in the event
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

// create an event 
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

//create a user in an event 
router.post("/attending", async (req, res) => {
  try{
  const data = await Eventgroup.create(req.body)
  res.status(200).json(data);
  } catch(err){
    res.status(500).json(err.message);
  }
})

//get a user in an event 
router.get("/attending/:id", async (req, res) => {
  try{
  const eventData = await Eventgroup.findAll({where:{eventId: req.params.id} })
  res.status(200).json(eventData);
  } catch(err){
    res.status(500).json(err.message);
  }
})

//update an event and the users in it
// router.put("/:id", async (req, res) => {
//   try{
//   const eUpdate = await Event.update(req.body, {where: {id: req.params.id,}
//   });
//   const eGroupFind = await Eventgroup.findAll({
//     where: { userId: req.params.id },
//   });
//   return eGroupFind;

//   } catch(err){
//     res.status(400).json(err);
//   }

// })

router.put("/:id", (req, res) => {
  Event.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((eventgroup) => {
      return Eventgroup.findAll({ where: { eventId: req.params.id } });
    })
    .then((eventGroups) => {
      // get list of current eventIds
      const userIds = eventGroups.map(({ userId }) => userId);
      // create filtered list of new tag_ids
      const newUserIds = req.body.userIds
        .filter((userId) => !userIds.includes(userId))
        .map((userId) => {
          return {
            eventId: req.params.id,
            userId,
            id,
          };
        });
      // figure out which ones to remove
      const userIdsToRemove = eventGroups
        .filter(({ userId }) => !req.body.userIds.includes(userId))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        Eventgroup.destroy({ where: { id: userIdsToRemove } }),
        Eventgroup.bulkCreate(newUserIds),
      ]);
    })
    .then((newUsers) => res.json(newUsers))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err.message);
    });
});

//delete an event by id
router.delete("/:id", (req, res) => {
  Event.destroy({ where: { id: req.params.id } }).then((data) =>
    res.json(data)
  );
});

//delete users from an event
router.delete("/attending/:id", (req,res) => {
  Eventgroup.destroy({where:{eventId: req.params.id}}).then((data) =>
    res.json(data)
  )
});

module.exports = router;