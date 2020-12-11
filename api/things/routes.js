const express = require("express");
const passport = require("passport");
const {
  randomController,
  treasureController,
  thingCreate,
} = require("./controllers");

const router = express.Router();

router.get("/random", randomController);

router.get(
  "/treasure",
  // passport.authenticate("local", { session: false }), => Needs to be added so only users who signed in acn view
  treasureController
);

router.post("/", thingCreate);

module.exports = router;
