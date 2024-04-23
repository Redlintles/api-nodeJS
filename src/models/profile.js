'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile.init({
    id_user: DataTypes.INTEGER,
    banner: DataTypes.BLOB,
    bio: DataTypes.STRING,
    profile_photo: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};