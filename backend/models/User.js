const { DataTypes } = require("sequelize");
const db = require("../config/database");
const Token = require("./Token");

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter field: name",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter field: email",
        },
        isEmail: {
          msg: "Please enter a valid email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter field: password",
        },
        min: {
          value: 23,
          msg: "Password length must be 6 characters or more",
        },
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      defaultValue: "user",
    },
    verificationToken: DataTypes.STRING,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verified: DataTypes.DATE,
    passwordToken: DataTypes.STRING,
    passwordTokenExpirationDate: DataTypes.DATE,
  },
  {
    timestamps: true,
    hooks: {
      afterCreate: (record, options) => {
        record.createdAt = Date.now();
        record.updatedAt = Date.now();
      },
    },
  }
);

User.sync({ force: true })
  .then((data) => {
    console.log("Model synced successfully: 'User'");
  })
  .catch((error) => {
    console.log("Error syncing model: 'User'\n", error);
  });

module.exports = User;
