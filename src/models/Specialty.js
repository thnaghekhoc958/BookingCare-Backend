'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialtys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Specialtys.init({
    descriptionHTML: DataTypes.TEXT,
    descriptionMarkdown: DataTypes.TEXT,
    nameSpecialty: DataTypes.STRING,
    image: DataTypes.BLOB('long'),

  }, {
    sequelize,
    tableName: 'Specialtys',
    modelName: 'Specialtys',
  });
  return Specialtys;
};