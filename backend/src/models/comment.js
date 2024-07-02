"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Post, {
        as: "Comment Post",
        foreignKey: "id_post",
        onDelete: "CASCADE",
      });
      Comment.belongsTo(models.User, {
        as: "Comment Author",
        foreignKey: "id_author",
        onDelete: "CASCADE",
      });
      Comment.hasMany(models.Comment, {
        as: "Replies",
        foreignKey: "belongs_to",
      });
      Comment.belongsTo(models.Comment, {
        as: "ParentComment",
        foreignKey: "belongs_to",
        onDelete: "CASCADE",
      });
    }
  }
  Comment.init(
    {
      id_author: DataTypes.INTEGER,
      id_post: DataTypes.INTEGER,
      belongs_to: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
