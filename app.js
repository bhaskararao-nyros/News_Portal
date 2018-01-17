var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var path = require('path');
var cors = require('cors');

var app = express();

const route = require('./routes/route');

const port = 3000;

//connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/news');
var promise = mongoose.connect('mongodb://localhost:27017/news', {
  useMongoClient: true,
});

//on connection
mongoose.connection.on('connected',()=>{
	console.log("connected to database MongoDB @ 27017");
});

mongoose.connection.on('error',(err)=>{
	if (err) {
		console.log("Error in database connection"+err);
	}
});

//adding middle-ware
app.use(cors());

//body-parser
app.use(bodyparser.json());

//route
app.use(route);






app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port,()=>{
	console.log("Server started at port: "+port);
});

module.exports = app;