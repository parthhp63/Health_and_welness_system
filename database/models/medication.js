'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class medication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      medication.belongsTo(models.users,{foreignKey:'user_id'});
    }
  }
  medication.init({
    user_id: DataTypes.INTEGER,
    medicine_name:DataTypes.STRING,
    description:DataTypes.STRING,
    file: DataTypes.STRING,
    frequency: DataTypes.STRING,
    recurrence_type: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    week_day: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'medication',
  });
  return medication;
};