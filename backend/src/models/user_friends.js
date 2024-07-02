"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_friends.belongsTo(models.User, {
        foreignKey: "id_user",
        as: "user",
        onDelete: "CASCADE",
      });

      User_friends.belongsTo(models.User, {
        foreignKey: "id_friend",
        as: "friend",
        onDelete: "CASCADE",
      });
    }
  }
  User_friends.init(
    {
      id_user: DataTypes.INTEGER,
      id_friend: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_friends",
    }
  );
  return User_friends;
};
