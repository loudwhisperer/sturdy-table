const router = require("express").Router();
const apiRoutes = require("./api");
//const {Event, EventGroup, Friend, User}
router.use("/api", apiRoutes);

module.exports = router;
