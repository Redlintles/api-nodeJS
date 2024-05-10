'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const db = require("../utils/db");
module.exports = ((sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Post)
      Comment.belongsTo(models.User)
      Comment.belongsTo(models.Comment)
    }
  }
  Comment.init({
    id_author: DataTypes.INTEGER,
    id_post: DataTypes.INTEGER,
    belongs_to: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
})(db,DataTypes);