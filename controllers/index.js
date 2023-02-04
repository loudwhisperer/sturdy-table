const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api");
const accountRoutes = require("./accountRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
// router.use("/:id/accounts", accountRoutes);

module.exports = router;
