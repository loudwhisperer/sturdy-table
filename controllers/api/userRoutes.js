const router = require("express").Router();
const { User, Event, Eventgroup } = require("../../models");
const bcrypt = require("bcrypt");
const auth = require("../../utils/auth");

//get all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({attributes: ["id", "email", "displayname"]});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
})

//get a user by id with any events they are hosting and attending
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include:[{model: Event, as: Event.id}]});
    
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
      const userData = await User.findByPk(req.params.id);
      res.render("account", userData);
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
      res
        .status(404)
        .json({
          message:
            "No Email of that name resides in this town dear adventurer",
        });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      data.password
    );
    if (!validPassword) {
      res
        .status(404)
        .json({
          message:
            "You roll a one on you intelligence check, please provide a valid password or use a registered email.",
        });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json({ message: "Login succeeded" });
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message:
          "An error occurred, please try again. If problem persists roll for initiative",
      });
  }
});

//log out 
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// update a user by id
router.put("/:id", async (req, res) => {
  try{ 
    const data = await User.update(req.body, { where: { id: req.params.id } })
     res.status(200).json(data);
  }catch(err){
  res.status(500).json(err);
  }
})

// delete a user
router.delete("/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } }).then((data) =>
    res.json(data)
  );
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