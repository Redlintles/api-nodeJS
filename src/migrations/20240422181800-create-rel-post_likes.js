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
    return await queryInterface.createTable("post_likes", {
      id_post: {
        type: Sequelize.INTEGER,
        references: {
          model: "posts",
          key: "id"
        }
      },
      id_liker: {
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
    return await queryInterface.dropTable("post_likes")
  }
};
