'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Historys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Historys.init({
    paientId: DataTypes.INTEGER,
    doctorId: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    tableName: 'Historys',
    modelName: 'Historys',
  });
  return Historys;
};