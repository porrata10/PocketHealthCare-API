const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../db');


class AdministrationType extends Model {}
AdministrationType.init({
  AdministrationType_ID: {type:DataTypes.INTEGER, primaryKey: true},
  Name: DataTypes.INTEGER,

}, { sequelize: db.sequelize, modelName: 'AdministrationType' });

module.exports = AdministrationType;