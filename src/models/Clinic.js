'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Clinics.init({
    nameClinic: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.TEXT,
    descriptionHTML: DataTypes.TEXT('long'),
    descriptionMarkdown: DataTypes.TEXT('long'),
    image: DataTypes.BLOB('long'),


  }, {
    sequelize,
    tableName: 'Clinics',
    modelName: 'Clinics',
  });
  return Clinics;
};