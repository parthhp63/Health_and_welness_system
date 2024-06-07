'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      file: {
        type: Sequelize.STRING
      },
      recurrence_type: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      time: {
        type: Sequelize.TIME
      },
      week_day: {
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

    queryInterface.addConstraint('medications',{
      fields:['user_id'],
      type:'foreign key',
      references:{
        table:'users',
        field:'id',
      },
      onDelete:'cascade',
      onUpdate:'cascade'
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('medications');
  }
};