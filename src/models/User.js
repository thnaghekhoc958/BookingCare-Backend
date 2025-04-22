'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Users.belongsTo(models.Allcodes,{foreignKey: 'positionId',targetKey: 'keyMap',as: 'positionData',constraints: false})
      // Users.belongsTo(models.Allcodes,{foreignKey: 'gender',targetKey: 'keyMap',as: 'genderData',constraints: false})

      Users.belongsTo(models.Allcodes,{foreignKey: 'positionId',targetKey: 'keyMap',as: 'positionData'})
      Users.belongsTo(models.Allcodes,{foreignKey: 'gender',targetKey: 'keyMap',as: 'genderData'})
      Users.belongsTo(models.Allcodes,{foreignKey: 'roleId',targetKey: 'keyMap',as: 'roleData'})
      
      Users.hasOne(models.MarkDownObjects, {foreignKey: 'doctorId'})
      Users.hasOne(models.Doctor_Infor, {foreignKey: 'doctorId'})

    }
  };
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    address: DataTypes.STRING,
    password : DataTypes.STRING,
    image : DataTypes.STRING,
    gender : DataTypes.STRING,
    roleId : DataTypes.STRING,
    positionId: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Users',
    modelName: 'Users',
  });
  return Users;
};