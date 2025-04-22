'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcodes.hasMany(models.Users, {foreignKey: 'positionId', as: 'positionData'})
      Allcodes.hasMany(models.Users, {foreignKey: 'gender', as: 'genderData'})
      Allcodes.hasMany(models.Users, {foreignKey: 'roleId', as: 'roleData'})

      Allcodes.hasMany(models.Schedules, {foreignKey: 'timeType', as: 'timeTypeData'})

      Allcodes.hasMany(models.Doctor_Infor, {foreignKey: 'priceId', as: 'priceData'})
      Allcodes.hasMany(models.Doctor_Infor, {foreignKey: 'provinceId', as: 'provinceData'})
      Allcodes.hasMany(models.Doctor_Infor, {foreignKey: 'paymentId', as: 'paymentData'})
      
    }
  };
  Allcodes.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEN: DataTypes.STRING,
    valueVI: DataTypes.STRING,


  }, {
    sequelize,
    tableName: 'Allcodes',
    modelName: 'Allcodes',
  });
  return Allcodes;
};