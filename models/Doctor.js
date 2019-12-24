const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../db');


class Doctor extends Model {}
Doctor.init({
  DoctorsID: {type:DataTypes.INTEGER, primaryKey: true},
  Name: DataTypes.STRING,
  Specialty: DataTypes.STRING,
  Latitude: DataTypes.DOUBLE,
  Longitude: DataTypes.DOUBLE,
  Address1: DataTypes.STRING,
  Address2: DataTypes.STRING,
  City: DataTypes.STRING,
  State: DataTypes.STRING,
  Country: DataTypes.STRING,
  ZipCode: DataTypes.STRING,

}, { sequelize: db.sequelize, modelName: 'Doctor' });

module.exports = Doctor;