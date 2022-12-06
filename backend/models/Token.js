const { DataTypes } = require("sequelize");
const db = require("../config/database");
const User = require("./User");

const Token = db.define(
  "token",
  {
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    hooks: {
      afterCreate: (record, options) => {
        record.createdAt = Date.now();
        record.updatedAt = Date.now();
      },
      afterUpdate: (record, options) => {
        record.updatedAt = Date.now();
      },
    },
  }
);

User.hasMany(Token);
Token.belongsTo(User);

Token.sync({ force: true })
  .then((data) => {
    console.log("Model synced successfully: 'Token'");
  })
  .catch((error) => {
    console.log("Error syncing model: 'Token'\n", error);
  });

module.exports = Token;
