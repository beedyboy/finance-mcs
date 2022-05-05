'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.INTEGER
      },
      dueDate: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      reference: {
        type: Sequelize.STRING
      },
      account: {
        type: Sequelize.INTEGER,

        onDelete: 'CASCADE',
        references: {
          model: 'Account',
          key: 'id',
          as: 'accountId',
        }
      },
      type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invoices');
  }
};