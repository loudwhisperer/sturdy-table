const router = require("express").Router();
const { User, Event, Eventgroup } = require("../../models");
const bcrypt = require("bcrypt");
const notify = require("../../utils/email-notification");

//get all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: ["id", "email", "displayname"],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a user by id with any events they are hosting and attending
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Event, as: Event.id }],
    });

    if (!userData) {
      res.status(404).json({ message: "No User Found" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get an account
router.get("/:id/account", async (req, res) => {
  try {
    // Get user data
    const userData = await User.findByPk(req.params.id);
    const user = userData.dataValues;

    // Get event data for events user is hosting
    const hostData = await Event.findAll({
       where: { host_id: req.params.id },
       attributes: ['id', 'name', 'game_name'],
       include: [
        {
          model: User,
          as: 'party_members'
        },
      ] 
      });
    const hosting = hostData.map((host) => host.get({ plain: true }));

    // Format the data sent over
    for (let i = 0; i < hosting.length; i++) {
      let members = hosting[i].party_members;
      for (let z = 0; z < members.length; z++) {
        delete members[z].id;
        delete members[z].email;
        delete members[z].password;
      }
    }

    // Get event data for events user is attending
    const attendData = await Eventgroup.findAll({
      where: { userId: req.params.id }
    });
    const attending = attendData.map((attend) => attend.get({ plain: true }));

    // Add event name to the attendData array of objects
    for (let i = 0; i < attending.length; i++) {
      const newData = await Event.findOne({
        raw: true,
        where: { id: attending[i].eventId },
        attributes: ['name']
      });
      attending[i].eventName = newData.name;
    }

    res.render("account", {
      attending,
      hosting,
      user,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//create a user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      displayname: req.body.displayname,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = data.id;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//login post for a user to login
router.post("/login", async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!data) {
      res.status(404).json({
        message: "No Email of that name resides in this town dear adventurer",
      });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      data.password
    );
    if (!validPassword) {
      res.status(404).json({
        message:
          "You roll a one on you intelligence check, please provide a valid password or use a registered email.",
      });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = data.id;
      res.status(200).redirect("/");
    });
  } catch (err) {
    res.status(500).json({
      message:
        "An error occurred, please try again. If problem persists roll for initiative",
    });
  }
});

//log out
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
      
    });
  } else {
    res.status(404).end();
  }
});

// update a user by id
router.put("/:id/account", async (req, res) => {
  try {
    const data = await User.update(req.body, {
      where: { id: req.params.id },
      include: ["email", "displayname"],
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/changepass", async (req, res) => {
  try {

      const userDb = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
    const data = await User.update(req.body, {
      where: { id: req.params.id },
      individualHooks: true,
    });

    const validPassword =  (updatedUserData) => {
        updatedUserData.password = bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      }
      
    if (!validPassword) {
      res.status(404).json({
        message:
          "You roll a one on you intelligence check, please provide a valid password.",
      });
      return;
    }
    // res.render("changepassword", {
    //   data,
    //   loggedIn: req.session.loggedIn,
    //   userId: req.session.userId,
    // });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message)
  }
});

// delete a user
router.delete("/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } }).then((data) => res.json(data));
});

// for future development of a freind request and friend list system

// module.exports.getFriends = async (req, res) => {
//     try {
//        const user = await db.User.findOne({
//           where: {
//           id: req.user.id,
//           },
//           include: 'friends'
//       })
//       if (!user) throw new Error('User not found!');
//       res.send(user.friends);
//     } catch (error) {
//       res.send(error.message)
//     }
//   }

module.exports = router;
