const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  item: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);