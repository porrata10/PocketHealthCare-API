const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../db');


class MedicalPlanDosageForCovert extends Model {}
MedicalPlanDosageForCovert.init({

  MedicalPlanCovertID: DataTypes.INTEGER,
  MedicalPlan: DataTypes.STRING,
  Covert: DataTypes.STRING,
  DosageAmount: DataTypes.DOUBLE,

}, { sequelize: db.sequelize, modelName: 'MedicalPlanDosageForCovert' });

module.exports = MedicalPlanDosageForCovert;