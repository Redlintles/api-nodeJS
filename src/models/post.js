"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: "id_author",
        onDelete: "CASCADE",
      });
      Post.hasMany(models.Comment, {
        foreignKey: "id_post",
        onDelete: "CASCADE",
      });
      Post.belongsToMany(models.User, {
        through: "post_likes",
        foreignKey: "id_post",
        onDelete: "CASCADE",
      });
    }
  }
  Post.init(
    {
      id_author: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      image: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
