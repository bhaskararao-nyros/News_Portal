var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
  	title: { type: String },
    body:{ type:String },
    cat_id: { type: String },
    sc_id: { type: String },
    }, {
    timestamps: true
});

module.exports = mongoose.model('News', NewsSchema);