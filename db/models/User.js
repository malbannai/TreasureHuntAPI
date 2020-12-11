module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address, جيك جيك عدل, مو حاط @؟",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return User;
};
