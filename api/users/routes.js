const express = require("express");
const passport = require("passport");
const { signup, signin, signout } = require("./controllers");

const router = express.Router();
const signInPassportMiddleware = passport.authenticate("local", {
  session: false,
});

router.post("/signup", signup);
router.post("/signin", signInPassportMiddleware, signin);
router.put("/signout/:userId", signout);

module.exports = router;
