const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../db');


class Dosage extends Model {}
Dosage.init({
  Amount: DataTypes.INTEGER,

}, { sequelize: db.sequelize, modelName: 'Dosage' });

module.exports = Dosage;