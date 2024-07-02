const Sequelize = require("sequelize");

const { User } = require("./models");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
  }
);

async function modelFunctions() {
  const data = {};
  const newData = {};
  const user1 = await User.create({ ...data }); // Creates an instance
  await user1.save(); // Saves the instance to the database

  const users = await User.findAll(); // Get all users in user table
  const u = await User.findOne({ where: { id: 1 } }); // Get the user with id 1

  await user1.set({ ...newData }); // Set user1 properties to newData
  await user1.save(); // Save the updated changes to the database

  await User.update(newData, { where: { id: 1 } }); // Update query with static method

  await user1.destroy(); // delete query from instance

  await User.destroy({ where: { id: 1 } }); // delete query with static method
}

module.exports = sequelize;
