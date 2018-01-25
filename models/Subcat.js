var mongoose = require('mongoose');

var SubCatSchema = new mongoose.Schema({
	name: { type: String },
    cat_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }],
    }, {
    timestamps: true
});

module.exports = mongoose.model('subcat', SubCatSchema);