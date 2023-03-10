const router = require("express").Router();
const { truncate } = require("lodash");
const { User, Event, Eventgroup } = require("../../models");
const notify = require("../../utils/email-notification");

// Get a user by displayname to add to an event
router.get('/find-user/:displayname', async (req, res) => {
  try {
    const user = await User.findOne({
      raw: true,
      where: { displayname: req.params.displayname}
    });
    if (!user) {
      res.status(404).json({ message: "No User Found" });
      return;
    }
    res.status(200).json(user);
  } 
  catch(err) {res.status(500).json(err);}
});

// Get /create-event page
router.get('/create-event', async (req, res) => {
  try {
    res.render('create-event', {
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } 
  catch(err) {
    res.status(500).json(err);
  }
});

// GET route to the edit-event page
router.get('/:id/edit-event', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "party_members",
        },
      ],
      // TODO: add an attributes to have everything returned in the user object but the encrypted password
    });
    if (!eventData) {
      res.status(404).json({ message: "No Event Found By This Name" });
      return;
    }

    // Turn db data into handlebars plain obj
    const event = eventData.get({ plain: true });
    
    res.render('edit-event', {
      event,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } 
  catch(err) {
    res.status(500).json(err);
  }
});

// get an event with all fields and all users in the event
router.get("/:id", async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "party_members",
        },
      ],
      // TODO: add an attributes to have everything returned in the user object but the encrypted password
    });
    if (!eventData) {
      res.status(404).json({ message: "No Event Found By This Name" });
      return;
    }

    // Turn db data into handlebars plain obj
    const event = eventData.get({ plain: true });

    // Send handlebars page to user
    res.render("event", {
      event,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });

    //res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// create an event
router.post("/", async (req, res) => {
  try {
    const dbEventData = await Event.create(req.body);
    const userData = await User.findByPk(req.body.host_id, { raw: true });
      notify(
        `${userData.email}`,
        `Hello ${userData.displayname}, ${dbEventData.name} has been created may your reign be long and fruitful`,
        `Now that you have created the event its time to add some users to it, go ahead and do that in your event page now`
      );
    res.status(200).json(dbEventData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//create a user in an event
router.post("/attending", async (req, res) => {
  try {
    const groupData = await Eventgroup.create(req.body);
    const eventData = await Event.findByPk(req.body.eventId, {raw:true});
    const userData = await User.findByPk(req.body.userId, {raw:true})
      notify(
        `${userData.email}`,
        `This is an invite to play ${eventData.game_name} with your friends. It will self destruct in 3..2..1`,
        `your invited to ${eventData.name} at ${eventData.location} starting at ${eventData.time_start}`
      );
    res.status(200).json(groupData);
  } catch (err) {
    console.info(err);
    res.status(500).json(err.message);
  }
});

//get a user in an event
router.get("/attending/:id", async (req, res) => {
  try {
    const eventData = await Eventgroup.findAll({
      where: { eventId: req.params.id },
    });
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Approve a user for an event
router.put('/approved/:eventId/:otherId', async (req, res) => {
  try {
    const getParty = await Eventgroup.findAll({
      raw: true, 
      where: {eventId: req.params.eventId}
    });
    const getGroupId = getParty.find((user) => {return user.userId == req.params.otherId});

    const data = await Eventgroup.update(req.body, {
      where: { id: getGroupId.id }
    });
      const userData = await User.findByPk(req.params.otherId, { raw: true });
      const eventData = await Event.findByPk(req.params.eventId, { raw: true });
    notify(
      `${userData.email}`,
      `Hello ${userData.displayname} you have been approved by host to join ${eventData.name}`,
      `Go check it out on your account page`
    );
    

    res.status(200).json(data);
  }
  catch(err) {res.status(500).json(err.message);}
});

//update an event
router.put("/:id", async (req, res) => {
  try {
    const data = await Event.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete an event by id
//TODO: change this to work with an association between User and Eventgroup for better coding practices
router.delete("/:id", async (req, res) => {
  try{
    const getParty = await Eventgroup.findAll({where: {eventId: req.params.id}})
    const eventData = await Event.findByPk(req.params.id, { raw: true });
  const emailArr = []
  for(let i = 0; i < getParty.length; i++){
     const findUser = await User.findByPk(getParty[i].userId, {raw: true});
     emailArr.push(findUser.email);
  }
  notify(
      `${emailArr}`,
      `The Party Has Been TPK'ed`,
      `Sorry ${eventData.name} has been canceled`
    );
  const destroy = await Event.destroy({ where: { id: req.params.id } })
  res.status(200).json(destroy);
  } catch(err){
  res.status(500).json(err.message);
  }
});

//delete users from an event
router.delete("/attending/:id/:otherId", async (req, res) => {
  try{
  const findEventGroup = await Eventgroup.findAll({
  where: { eventId: req.params.id },  raw: true 
  });
  const groupArr = findEventGroup.find((user) => {
    return user.userId == req.params.otherId
  })

  const delUser = await Eventgroup.destroy(
    { where: { id: groupArr.id } }
  );
  const userData = await User.findByPk(req.params.otherId, { raw: true });
  const eventData = await Event.findByPk(req.params.id, { raw: true });
    notify(
      `${userData.email}`,
      `You have been stricken from the record of ${eventData.name}. Good Day to You!!`,
      `Maybe the next one`
    );
   res.status(200).json(delUser);
    } catch(err){
      res.status(500).json(err.message);
    }
});

module.exports = router;
