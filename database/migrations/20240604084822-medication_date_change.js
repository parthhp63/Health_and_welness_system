'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('medications','start_date',{
      type: Sequelize.DATEONLY,
        allowNull: false
    }),
    await queryInterface.changeColumn('medications','end_date',{
      type: Sequelize.DATEONLY,
        allowNull: false
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('medications', 'start_date');
    await queryInterface.removeColumn('medications', 'end_date');
  }
};
