var express = require('express');
var mongoose = require('mongoose');
var News = require('./models/News.js');
var news = require('./routes/news');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();


mongoose.connect('mongodb://localhost/my_database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/news', news);

module.exports = app;