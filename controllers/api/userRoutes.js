const router = require("express").Router();
const { User, Event, Friend, EventGroup } = require("../models");


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