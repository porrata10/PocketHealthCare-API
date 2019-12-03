const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../db');


class MedicalPlanDosageForCovert extends Model {}
MedicalPlanDosageForCovert.init({
  Dosage_ID: DataTypes.INTEGER,
  Amount: DataTypes.INTEGER,
  MedicalPlanCovert_ID: DataTypes.INTEGER,
  MedicalPlan: DataTypes.STRING,
  Covert: DataTypes.STRING,

}, { sequelize: db.sequelize, modelName: 'MedicalPlanDosageForCovert' });

module.exports = MedicalPlanDosageForCovert;