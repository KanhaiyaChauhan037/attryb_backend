const mongoose = require('mongoose');
require('dotenv').config()

const oemSchema = mongoose.Schema({
  model: { type: String, required: true },
  year: { type: String, required: true },
  listPrice: { type: Number, required: true },
  availableColors: { type: [String], required: true },
  mileage: { type: Number, required: true },
  power: { type: Number, required: true },
  maxSpeed: { type: Number, required: true }
},{versionKey:false});


const OEMModel = mongoose.model('OEMItems', oemSchema);

module.exports = {OEMModel};