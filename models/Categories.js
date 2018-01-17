var mongoose = require('mongoose');

var CategoriesSchema = new mongoose.Schema({
  name: { type: String },
    }, {
  timestamps: true
});

module.exports = mongoose.model('Categorie', CategoriesSchema);