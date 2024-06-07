'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      reports.belongsTo(models.users,{foreignKey:'user_id'});
    }
  }
  reports.init({
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    report_data: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reports',
  });
  return reports;
};