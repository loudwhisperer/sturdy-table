const router = require("express").Router();
const { User, Event, EventGroup } = require("../../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: User}],
    });
    if (!userData) {
      res.status(404).json({ message: "No User Found By This Name" });
      return;
    }
    res.status(200).json(eventData);
  } catch (err) {}
});

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


router.put("/:id", async (req, res) => {
  try{ 
    const data = await User.update(req.body, { where: { id: req.params.id } })
     res.status(200).json(data);
  }catch(err){
  res.status(500).json(err);
  }
})

router.delete("/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } }).then((data) =>
    res.json(data)
  );
});


// for future development as of a freind request and friend list system
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