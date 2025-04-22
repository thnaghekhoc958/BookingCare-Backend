'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarkDownObjects
 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MarkDownObjects.belongsTo(models.MarkDownObjects, {foreignKey: 'doctorId'})
    }
  };
  MarkDownObjects
.init({
    contentHTML: DataTypes.TEXT('long'),
    contentMarkdown: DataTypes.TEXT('long'),
    description:DataTypes.TEXT('long'),

    doctorId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'MarkDownObjects',
    modelName: 'MarkDownObjects',
  });
  return MarkDownObjects
;
};