const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const { User } = require("../db/models");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { email: username },
    });

    let passwordsMatch;

    if (user) {
      passwordsMatch = await bcrypt.compare(password, user.password);
    } else {
      passwordsMatch = false;
    }

    if (passwordsMatch) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});

//New Strategy Instance
exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: "asupersecretkey",
  },

  async (jwtPayload, done) => {
    // console.log("issue in jwtStrategy" + error);
    if (Date.now() > jwtPayload.exp) {
      return done(null, false); // this will throw a 401
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      done(null, user); // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }
);
