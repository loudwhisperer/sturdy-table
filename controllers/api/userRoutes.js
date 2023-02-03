const router = require("express").Router();
const { User, Event, Friend, EventGroup } = require("../../models");
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
      include: [{ model: User, as: "displayname" }],
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

router.delete("/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } }).then((data) =>
    res.json(data)
  );
});



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