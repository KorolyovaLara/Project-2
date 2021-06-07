const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });

const sequelize = require("./config/connection");

const { setNewToken } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// lanign page and others

// 404 page
app.use(function (req, res) {
  res.status(400);
  res.render("404", { title: "404: Page Not Found" });
});

app.use(routes);
app.use(setNewToken);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
