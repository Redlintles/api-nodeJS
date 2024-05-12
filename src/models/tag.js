"use strict";
const { Model, DataTypes } = require("sequelize");

const db = require("../utils/db");
module.exports = ((sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsToMany(models.User, { through: "User_tag" });
    }
  }
  Tag.init(
    {
      tag_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
})(db, DataTypes);
