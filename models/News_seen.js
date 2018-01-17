var mongoose = require('mongoose');

var NewsSeenSchema = new mongoose.Schema({
  	news_id:{ type: String },
    cat_id:{ type:String },
    count:{ type: Number },
    }, {
    timestamps: true
});

module.exports = mongoose.model('News_seen', NewsSeenSchema);