const express = require('express');
const router = express.Router();

// Modals
const News = require('../models/News');
const Categories = require('../models/Categories');
const News_seen = require('../models/News_seen');
const Sub_cat = require('../models/Subcat');

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
   res.json(news);
  });
});

// Delete news item
router.use('/deleteNews',(req,res,next)=>{
  News.findByIdAndRemove(req.body._id, req.body, function (err, news) {
    if (err) return next(err);
    if (news) {
      // console.log(news);
      News.find(function(err, allnews) {
        res.json(allnews);
      })
    }
  });
});

// Update news item
router.use('/updateNews',(req,res,next)=>{
  // console.log(req.body);

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
  // console.log(req.body);
  News.find({cat_id: req.body._id}, function (err, news) {
    if (err) return next(err);
    console.log(news);
    res.json(news);
  });
});

// Insert into news seen modal
router.use('/addtoNewsSeen',(req,res,next)=>{
  News_seen.findOne({news_id: req.body._id},function(err, newsExisted){
  let count = 1;
    if (newsExisted == null) {
      News_seen.create({news_id:req.body._id, cat_id:req.body.cat_id,sc_id:req.body.sc_id, count:count}, function (err, news_seen) {
        // res.json(news_seen);
        if (news_seen) {
          News.findOne({_id: news_seen.news_id}, function (err, news) {
            if (err) return next(err);
            res.json(news);
          });
        }
      });
    } else {
      let countInc = newsExisted.count+1;
      console.log(countInc);
      News_seen.update({news_id:req.body._id} , {$set: {news_id:req.body._id, cat_id:req.body.cat_id,sc_id:req.body.sc_id, count:countInc}},{upsert:true}, function (err, news_seen_update) {
        if (news_seen_update) {
          News_seen.find({}).populate('news_id').exec(function(err, news_seen) {
            res.json(news_seen);
          });
        }
      });
    }
  });
});

// Get all news seen
router.get('/getAllNewsSeen',(req,res,next)=>{
  News_seen.find({}).populate('news_id').exec(function(err, news_seen) {
    res.json(news_seen);
  });
});

// Delete record from News Seen modal
router.use('/delNewsSeen/:id',(req,res,next)=>{
  News_seen.remove({_id:req.params.id}, function(err, del_news_seen) {
    if (del_news_seen) {
      News_seen.find({}).populate('news_id').exec(function(err, news_seen) {
        res.json(news_seen);
      });
    }
  })
});

// Add category
router.use('/addCat/:cat',(req,res,next)=>{
  Categories.create({name:req.params.cat},function(err, added_cat) {
    res.json(added_cat);
  });
});

// Delete category
router.use('/delCat/:cat_id',(req,res,next)=>{
  Categories.remove({_id:req.params.cat_id},function(err, deleted_cat) {
    if (deleted_cat) {
      Categories.find(function(err, cat) {
        res.json(cat);
      })
    }
  });
});

// Update category
router.use('/updateCat/:cat_id/:cat_name',(req,res,next)=>{
  console.log(req.params);
  Categories.findByIdAndUpdate(req.params.cat_id,{$set: {name: req.params.cat_name}},{new: true}, function(err, updated_cat) {
    if (updated_cat) {
      Categories.find(function(err, cat) {
        res.json(cat);
      });
    }
  });
});


// Add sub category
router.use('/addSubCat/:cat_id/:sub_cat_name',(req,res,next)=>{
  // console.log(req.params);
  Sub_cat.create({name:req.params.sub_cat_name, cat_id:req.params.cat_id}, function(err, sub_cat) {
    res.json(sub_cat);
  });
});

// Get all news sub cats onload
router.get('/getAllNewsSubCats',(req,res,next)=>{
  Sub_cat.find(function(err, sub_cat) {
    res.json(sub_cat);
  })
});

// Get sub categories on selecting main category
router.get('/fetchSubCat/:cat_id',(req,res,next)=>{
  Sub_cat.find({cat_id:req.params.cat_id}, function(err, sub_cat) {
    res.json(sub_cat);
  })
});

// Edit sub category
router.use('/editSubCat/:sub_cat_id/:sub_cat_name',(req,res,next)=>{
  console.log(req.params);
  Sub_cat.findByIdAndUpdate(req.params.sub_cat_id,{$set: {name: req.params.sub_cat_name}},{new: true}, function(err, updated_sub_cat) {
    if (updated_sub_cat) {
      Sub_cat.find(function(err, sub_cat) {
        res.json(sub_cat);
      });
    }
  });
});

// Delete sub category
router.use('/delSubCat/:sub_cat_id',(req,res,next)=>{
  Sub_cat.remove({_id:req.params.sub_cat_id},function(err, del_sub_cat) {
    if (del_sub_cat) {
      Sub_cat.find(function(err, sub_cat) {
        res.json(sub_cat);
      })
    }
  });
});

// Sort news using sub category
router.use('/sortNewsBySubCat/:sub_cat_id',(req,res,next)=>{
  News.find({sc_id:req.params.sub_cat_id},function(err, news) {
    res.json(news);
  });
}); 


module.exports = router;