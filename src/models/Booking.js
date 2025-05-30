'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bookings.init({
    statusId: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    patientId : DataTypes.INTEGER,
    dateBooking: DataTypes.STRING,
    timetype:DataTypes.STRING,
    token:DataTypes.STRING,


  }, {
    sequelize,
    tableName: 'Bookings',
    modelName: 'Bookings',
  });
  return Bookings;
};