"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn("User_tags", "id_tag", {
      type: Sequelize.INTEGER,
      references: {
        model: "Tags",
        key: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.changeColumn("User_tags", "id_user", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.changeColumn("User_tags", "id_tag", {
      type: Sequelize.INTEGER,
      references: {
        model: "Tags",
        key: "id",
      },
    });

    await queryInterface.changeColumn("User_tags", "id_user", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    });
  },
};
