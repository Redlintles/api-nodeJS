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
      User.belongsToMany(models.Post, {
        through: "post_likes",
        foreignKey: "id_user",
        onDelete: "CASCADE",
      });

      User.hasOne(models.Profile, {
        foreignKey: "id_user",
        onDelete: "CASCADE",
      });
      User.belongsToMany(models.Tag, {
        through: "User_tag",
        foreignKey: "id_user",
        onDelete: "CASCADE",
      });

      User.belongsToMany(models.User, {
        through: "user_friends",
        as: "friend",
        foreignKey: "id_friend",
        onDelete: "CASCADE",
      });

      User.belongsToMany(models.User, {
        through: "user_follower",
        as: "user",
        foreignKey: "id_user",
        onDelete: "CASCADE",
      });

      User.belongsToMany(models.User, {
        through: "user_followers",
        as: "follower",
        foreignKey: "id_follower",
        onDelete: "CASCADE",
      });

      User.belongsToMany(models.User, {
        through: "user_followers",
        as: "followed",
        foreignKey: "id_followed",
        onDelete: "CASCADE",
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
