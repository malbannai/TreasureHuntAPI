const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // to use the token

// Database
const { User } = require("../../db/models");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    req.body.password = hashedPassword;
    req.body.loggedIn = true;
    const user = await User.create(req.body);
    const payload = {
      id: user.id,
      email: user.email,
      exp: Date.now() + 900000,
    };
    const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { user } = req;
  try {
    const payload = {
      id: user.id,
      email: user.email,
      exp: Date.now() + 900000,
    };
    user.loggedIn = true;
    await user.save();
    const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
    const decoded = jwt.verify(token, "asupersecretkey");
    const userId = decoded.id;
    console.log(userId);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signout = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userFound = await User.findByPk(userId);
    userFound.loggedIn = 0;
    await userFound.save();
    res.status(201).json({ userFound });
  } catch (error) {
    next(error);
  }
};
