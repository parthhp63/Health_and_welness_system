'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('medications',
      'medicine_name',{
        type:Sequelize.DataTypes.STRING,
      }
    ),

    await queryInterface.addColumn('medications',
      'description',{
        type:Sequelize.DataTypes.STRING,
      }
    ),

    await queryInterface.addColumn('medications',
      'frequency',{
        type:Sequelize.DataTypes.STRING,
      }
    )

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('medications','medicine_name');
    await queryInterface.removeColumn('medications','description');
    await queryInterface.removeColumn('medications','frequency');

  }
};
