var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
  title: String,
  body: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', NewsSchema);