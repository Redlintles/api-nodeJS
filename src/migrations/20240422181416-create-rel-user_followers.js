'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable("user_followers", {
      id_followed: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id"
        }            
      },
      id_follower: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id"
        }          
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable("user_followers")
  }
};
