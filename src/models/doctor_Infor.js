'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_Infor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor_Infor.belongsTo(models.Doctor_Infor, {foreignKey: 'doctorId'})

      Doctor_Infor.belongsTo(models.Allcodes,{foreignKey: 'priceId',targetKey: 'keyMap',as: 'priceData'})
      Doctor_Infor.belongsTo(models.Allcodes,{foreignKey: 'provinceId',targetKey: 'keyMap',as: 'provinceData'})
      Doctor_Infor.belongsTo(models.Allcodes,{foreignKey: 'paymentId',targetKey: 'keyMap',as: 'paymentData'})

    }
  };
  Doctor_Infor.init({
    doctorId: DataTypes.INTEGER,
    priceId: DataTypes.STRING,
    provinceId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    addressClinic: DataTypes.STRING,
    nameClinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'Doctor_Infor',
    modelName: 'Doctor_Infor',
    freezeTableName: true
  });
  return Doctor_Infor;
};