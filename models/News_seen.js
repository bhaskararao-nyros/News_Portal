var mongoose = require('mongoose');

var NewsSeenSchema = new mongoose.Schema({
  	news_id:[{type: mongoose.Schema.Types.ObjectId, ref: 'News' }],
    cat_id:[{type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }],
    sc_id:[{type: mongoose.Schema.Types.ObjectId, ref: 'subcat' }],
    count:{ type: Number },
    }, {
    timestamps: true
});

module.exports = mongoose.model('News_seen', NewsSeenSchema);