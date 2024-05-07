'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

const db = require("../utils/db");
module.exports = ((sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.hasMany(models.Comment)
      Post.belongsToMany(models.User,{through: "post_likes"})
    }
  }
  Post.init({
    id_author: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
})(db,DataTypes);