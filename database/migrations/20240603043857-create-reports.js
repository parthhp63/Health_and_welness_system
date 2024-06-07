'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      report_data: {
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

    queryInterface.addConstraint('reports',{
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
    await queryInterface.dropTable('reports');
  }
};