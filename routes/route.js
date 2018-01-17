const express = require('express');
const router = express.Router();

// Modals
const News = require('../models/News');
const Categories = require('../models/Categories');
const News_seen = require('../models/News_seen');

// Get all news on load
router.get('/getNews',(req,res,next)=>{
  News.find(function(err, news) {
    res.json(news);
  })
});

// Get all categories on load
router.get('/getCategories',(req,res,next)=>{
  Categories.find(function(err, cat) {
    res.json(cat);
  })
});

// Add news items
router.post('/addNews',(req,res,next)=>{
  News.create(req.body, function (err, news) {
    if (err) return next(err);
   //  if (news) {
   //  	News.find(function(err, allnews) {
		 //    res.json(allnews);
			// })
   //  }
   res.json(news);
  });
});

// Delete news item
router.use('/deleteNews',(req,res,next)=>{
  News.findByIdAndRemove(req.body._id, req.body, function (err, news) {
    if (err) return next(err);
    if (news) {
      News.find(function(err, allnews) {
        res.json(allnews);
      })
    }
  });
});

// Update news item
router.use('/updateNews',(req,res,next)=>{
  console.log(req.body);

  News.findByIdAndUpdate(req.body._id, req.body, function (err, news) {
    if (err) return next(err);
    if (news) {
      News.find(function(err, allnews) {
        res.json(allnews);
      })
    }
  });
});

// Sort news by category
router.use('/sortNews',(req,res,next)=>{
  console.log(req.body);
  News.find({cat_id: req.body._id}, function (err, news) {
    if (err) return next(err);
    console.log(news);
    res.json(news);
  });
});

// Insert into news seen modal
router.use('/addtoNewsSeen',(req,res,next)=>{
  News_seen.findOne({news_id: req.body._id},function(err, newsExisted){
  let count = 0;
    if (newsExisted == null) {
      News_seen.create({news_id:req.body._id, cat_id:req.body.cat_id, count:count}, function (err, news_seen) {
        if (news_seen) {
          News.findOne({_id: news_seen.news_id}, function (err, news) {
            if (err) return next(err);
            res.json(news);
          });
        }
      });
    } else {
      let countInc = newsExisted.count+1;
      console.log(countInc)
      News_seen.update({news_id:req.body._id} , {$set: {news_id:req.body._id, cat_id:req.body.cat_id, count:countInc}},{upsert:true}, function (err, news_seen) {
        res.json({
          status:"success",
          message:"News Item Updated",
        });
      });
    }
  });
});

// Get all news seen
router.get('/getAllNewsSeen',(req,res,next)=>{
  News_seen.find(function(err, news_seen) {
    res.json(news_seen);
  })
});

// Delete record from News Seen modal
router.use('/delNewsSeen',(req,res,next)=>{
  News_seen.findByIdAndRemove(req.body._id, req.body, function(err, del_news_seen) {
    if (del_news_seen) {
      News_seen.find(function(err, news_seen) {
        res.json(news_seen);
      });
    }
  })
});


module.exports = router;