"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_follower.belongsTo(models.User, {
        foreignKey: "id_followed",
        as: "followed",
        onDelete: "CASCADE",
      });

      User_follower.belongsTo(models.User, {
        foreignKey: "id_follower",
        as: "follower",
        onDelete: "CASCADE",
      });
    }
  }
  User_follower.init(
    {
      id_followed: DataTypes.INTEGER,
      id_follower: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_follower",
    }
  );
  return User_follower;
};
