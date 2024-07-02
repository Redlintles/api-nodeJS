"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.belongsTo(models.User, {
        foreignKey: "admin_id",
        onDelete: "CASCADE",
      });
      Group.belongsToMany(models.User, {
        through: "User_group",
        onDelete: "CASCADE",
        foreignKey: "id_group",
      });
    }
  }
  Group.init(
    {
      admin_id: DataTypes.INTEGER,
      group_name: DataTypes.STRING,
      group_banner: DataTypes.BLOB,
      group_desc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
