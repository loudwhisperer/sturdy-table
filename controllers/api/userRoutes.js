const router = require("express").Router();
const { User, Event, Friend, EventGroup } = require("../../models");

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
  try{
const userData = await User.create({
  email: req.body.email,
  password: req.body.password,
  displayname: req.body.displayname,
});
res.status(200).json(userData);
  } catch(err){
    console.info(req.body);
res.status(400).json(err);
  }
})


module.exports.getFriends = async (req, res) => {
    try {
       const user = await db.User.findOne({
          where: {
          id: req.user.id,
          },
          include: 'friends'
      })
      if (!user) throw new Error('User not found!');
      res.send(user.friends);
    } catch (error) {
      res.send(error.message)
    }
  }

  module.exports = router;