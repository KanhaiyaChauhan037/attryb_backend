const mongoose = require('mongoose');
require('dotenv').config()

const dealerSchema = mongoose.Schema({
  name: {type: String,required: true},
  email: {type: String,required: true},
  password: {type: String,required: true},
  inventory: [{type: mongoose.Schema.Types.ObjectId,ref: 'MarketplaceInventory'}]
},{versionKey:false});

const DealerModel = mongoose.model('Dealer', dealerSchema);

module.exports = {DealerModel};