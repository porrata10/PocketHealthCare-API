const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../db');


class Medicine extends Model {}
Medicine.init({
  Medicine_ID: {type: DataTypes.INTEGER, primaryKey: true},
  Name: DataTypes.STRING,
  Purpose: DataTypes.STRING,
  Description: DataTypes.STRING,
  Category: DataTypes.STRING,
  DUR_Iteration: DataTypes.STRING,
}, { sequelize: db.sequelize, modelName: 'MedicineModel' });

module.exports = Medicine;