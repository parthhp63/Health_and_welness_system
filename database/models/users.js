'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.medication,{foreignKey:'user_id'});
      users.hasMany(models.reports,{foreignKey:'user_id'});
      users.hasMany(models.sessions,{foreignKey:'user_id'});

    }
  }
  users.init({
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    dob: DataTypes.STRING,
    mobile_no: DataTypes.STRING,
    age: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};