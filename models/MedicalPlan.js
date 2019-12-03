const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../db');


class MedicalPlan extends Model {}
MedicalPlan.init({
  MedicalPlan_ID: {type:DataTypes.INTEGER, primaryKey: true},
  Name: DataTypes.STRING,

}, { sequelize: db.sequelize, modelName: 'MedicalPlan' });

module.exports = MedicalPlan;