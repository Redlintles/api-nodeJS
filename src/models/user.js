"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: "id_author",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Comment, {
        foreignKey: "id_author",
        onDelete: "CASCADE",
      });

      User.hasMany(models.Group, {
        foreignKey: "admin_id",
        onDelete: "CASCADE",
      });
      User.belongsToMany(models.Group, {
        through: "User_group",
        foreignKey: "id_user",
        onDelete: "CASCADE",
      });
      User.belongsToMany(models.Post, { through: "post_likes" });

      User.hasOne(models.Profile, {
        foreignKey: "id_user",
        onDelete: "CASCADE",
      });
      User.belongsToMany(models.Tag, { through: "User_tag" });

      User.belongsToMany(models.User, {
        through: "user_friends",
        as: "friends",
        foreignKey: "id_user",
        otherKey: "id_friend",
      });

      User.belongsToMany(models.User, {
        through: "user_friends",
        as: "friendsOf",
        foreignKey: "id_friend",
        otherKey: "id_user",
      });

      User.belongsToMany(models.User, {
        through: "user_follower",
        as: "follower",
        foreignKey: "id_user",
        otherKey: "id_friend",
      });

      User.belongsToMany(models.User, {
        through: "user_follower",
        as: "friendsOf",
        foreignKey: "id_friend",
        otherKey: "id_user",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
