const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const thingRoutes = require("./api/things/routes");
const userRoutes = require("./api/users/routes");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);

// Routes
app.use("/things", thingRoutes);
//Users
app.use("/auth", userRoutes);

// NOT FOUND PATH MIDDLEWARE
app.use((req, res, next) => {
  console.log("PATH DOESN'T EXIST");
  res.status(404).json({ message: "PATH NOT FOUND!" });
});

app.use((err, req, res, next) => {
  console.log("Errrrroooooorrrrrr", err);
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

const run = async () => {
  try {
    // await db.sequelize.sync();
    await db.sequelize.sync({ alter: true });
    // await db.sequelize.sync({ force: true });
    console.log("Connection to the database successful!");
    app.listen(8001, () => {
      console.log("The application is running on localhost:8001");
    });
  } catch (error) {
    console.error("error", error);
  }
};

run();
