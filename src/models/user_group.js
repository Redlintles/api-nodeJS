'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_group.init({
    id_member: DataTypes.INTEGER,
    id_group: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_group',
  });
  return User_group;
};