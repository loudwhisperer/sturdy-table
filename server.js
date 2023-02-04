const express = require("express");
const path = require("path");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const session = require("express-session");

const helpers = require("./utils/helpers");

const hbs = exphbs.create({helpers});

const sequelize = require("./config/connection");

const app = express();
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
const PORT = process.env.PORT || 3001;

const sessionSettings = {
  secret: "lkdfgjdlkfjdlkfjdlkfjlkdjfdkjfldkjf",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionSettings));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);
// sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
//   .then(function () {
//     return sequelize.sync({ force: true });
//   })
//   .then(function () {
//     return sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
//   })
//   .then(
//     function () {
//       console.log("Database synchronised.");
//     },
//     function (err) {
//       console.log(err);
//     }
//   );
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App started in Port ${PORT}`);
  });
});
